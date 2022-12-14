import type {
	LoaderArgs,
	SerializeFrom,
	ActionArgs,
} from '@remix-run/cloudflare'
import type { Product } from '~/interfaces/product.interface'

import { useMemo } from 'react'
import { json } from '@remix-run/cloudflare'
import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { IconTrash } from '@tabler/icons'
import InputNumber from '~/components/negozio/input-number'
import { fromSession } from '~/models/cart'

export const action = async ({ request, context }: ActionArgs) => {
	const session = await context.sessionStorage.getSession(
		request.headers.get('Cookie')
	)

	const sessionCart = fromSession(session)

	const { _action, id } = Object.fromEntries(await request.formData())
	const itemId = Number(id)

	if (_action === 'increase') {
		sessionCart[itemId]++
	}

	if (_action === 'decrease') {
		sessionCart[itemId]--
	}

	if (_action === 'remove') {
		delete sessionCart[itemId]
	}

	session.set('cart', sessionCart)

	return json(
		{},
		{
			headers: {
				'Set-Cookie': await context.sessionStorage.commitSession(session),
			},
		}
	)
}

export const loader = async ({ request, context }: LoaderArgs) => {
	const { services } = context
	const session = await context.sessionStorage.getSession(
		request.headers.get('Cookie')
	)
	const sessionCart = fromSession(session)

	const productPromises = Object.keys(sessionCart).map(itemId =>
		services.woocommerce.get<Product>(`products/${itemId}`)
	)

	const cartProducts = await Promise.all(productPromises)

	const cart = cartProducts.map(product => ({
		quantity: sessionCart[product.id],
		...product,
	}))

	return json({ cart })
}

export default function CartPage() {
	const { cart } = useLoaderData<SerializeFrom<typeof loader>>()
	console.log(cart)

	const total = useMemo(() => {
		return cart.reduce(
			(acc, curr) => acc + curr.quantity * Number(curr.price),
			0
		)
	}, [cart])

	return (
		<section className="mx-auto flex max-w-5xl flex-col gap-10 overflow-x-hidden py-7 px-10">
			<header className="flex w-full flex-col gap-5">
				<h1 className="text-3xl font-semibold md:text-4xl">Carrello</h1>
			</header>
			{cart && cart.length > 0 ? (
				<>
					<div className="overflow-y-auto">
						<table className="w-full min-w-max table-auto border-separate border-spacing-8 text-left">
							<thead className="w-full">
								<tr>
									<th>Prodotto</th>
									<th>Quantit??</th>
									<th>Prezzo</th>
								</tr>
							</thead>
							<tbody className="w-full">
								{cart.map(item => (
									<CartItemRow key={item.id} item={item} />
								))}
							</tbody>
						</table>
					</div>
					<hr />
					<footer className="my-7 flex w-full justify-between">
						<div>{/* Note costumers */}</div>
						<div className="flex flex-col justify-end gap-10">
							<span className="text-right text-2xl font-semibold">
								Totale: ???{total.toFixed(2)}
							</span>
							<div className="flex items-center justify-between gap-4 text-xs md:text-base">
								<Link
									to="/negozio"
									className="flex items-center gap-2 px-3 py-2 hover:underline"
								>
									<span>Torna al negozio</span>
								</Link>
								<Link
									to="/checkout"
									className="flex items-center gap-2 rounded-lg bg-[#228be6] px-3 py-2 font-semibold text-white md:px-4"
								>
									<span>Procedi con il pagamento</span>
								</Link>
							</div>
						</div>
					</footer>
				</>
			) : (
				<div className="flex w-full flex-col items-center gap-7 py-20">
					<p className="text-3xl font-semibold text-zinc-500">
						Il tuo carrello ?? vuoto
					</p>
					<Link to="/negozio" className="underline">
						Vai al negozio
					</Link>
				</div>
			)}
		</section>
	)
}

interface CartItemRowProps {
	item: SerializeFrom<Product & { quantity: number }>
}

function CartItemRow({ item }: CartItemRowProps) {
	const fetcher = useFetcher()

	const totalItemPrice = useMemo(() => {
		return (Number(item.price) * Number(item.quantity)).toFixed(2)
	}, [item])

	return (
		<tr key={item.id}>
			<td className="flex flex-col">
				<Link
					to={`/negozio/${item.slug}`}
					className="group flex gap-5 font-semibold"
				>
					<img
						src={item.images[0].src}
						alt={item.images[0].alt}
						className="h-20 w-20 object-contain"
					/>
					<p className="flex flex-col gap-2">
						<span className="group-hover:underline">{item.name}</span>
						<span className="text-sm font-normal text-zinc-500">
							{item.price} ???
						</span>
					</p>
				</Link>
			</td>
			<td className="align-top">
				<fetcher.Form method="post" className="flex items-center gap-2">
					<input type="hidden" name="id" value={item.id} />
					<InputNumber
						name="quantity"
						initialValue={Number(item.quantity)}
						onIncrease={() =>
							fetcher.submit(
								{ _action: 'increase', id: String(item.id) },
								{ method: 'post' }
							)
						}
						onDecrease={() =>
							fetcher.submit(
								{ _action: 'decrease', id: String(item.id) },
								{ method: 'post' }
							)
						}
					/>
					<button
						type="submit"
						name="_action"
						value="remove"
						className="rounded-md p-1 hover:bg-zinc-50"
					>
						<IconTrash className="h-5 w-5" />
					</button>
				</fetcher.Form>
			</td>
			<td className="align-top">{totalItemPrice} ???</td>
		</tr>
	)
}
