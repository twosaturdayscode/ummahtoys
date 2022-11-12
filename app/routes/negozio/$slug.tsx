import type {
	LoaderArgs,
	SerializeFrom,
	ActionArgs,
} from '@remix-run/cloudflare'
import { json, redirect } from '@remix-run/cloudflare'
import { Form, Link, useLoaderData } from '@remix-run/react'
import InputNumber from '~/components/negozio/input-number'
import ProductImagesCarousel from '~/components/negozio/product-carousel'
import type { Cart, CartItem } from '~/interfaces/cart.interface'
import type { Product } from '~/interfaces/product.interface'

export const action = async ({ request, context }: ActionArgs) => {
	const session = await context.sessionStorage.getSession(
		request.headers.get('Cookie')
	)

	const { id, quantity } = Object.fromEntries(await request.formData())

	session.flash('message', 'Prodotto aggiunto al carrello!')

	if (!session.has('cart')) {
		const newCart = [{ id: id.toString(), quantity: Number(quantity) }]
		session.set('cart', newCart)

		return redirect('/negozio', {
			headers: {
				'Set-Cookie': await context.sessionStorage.commitSession(session),
			},
		})
	}

	const cart = session.get('cart') as Cart

	cart.push({
		id: id.toString(),
		quantity: Number(quantity),
	} as CartItem)

	session.set('cart', cart)

	return redirect('/negozio', {
		headers: {
			'Set-Cookie': await context.sessionStorage.commitSession(session),
		},
	})
}

export const loader = async ({ context, params }: LoaderArgs) => {
	const { services } = context

	if (params.slug) {
		const [product] = await services.woocommerce.get<Product[]>('products', {
			slug: params.slug,
		})

		if (product) return json({ product })
	}

	return redirect('/negozio/not-found')
}

export default function ProductDetails() {
	const { product } = useLoaderData<SerializeFrom<typeof loader>>()

	return (
		<article className="flex w-full flex-col items-center gap-7 md:gap-10 md:flex-row md:items-start">
			<header className="flex flex-col gap-1 md:hidden mt-5">
				<p className="flex flex-wrap gap-2 text-sm">
					{product.categories.map(category => (
						<span key={category.id}>{category.name}</span>
					))}
				</p>
				<h1 className="text-3xl">{product.name}</h1>
				<p className="text-lg font-medium">{product.price} €</p>
			</header>
			<aside className="w-full md:w-2/3">
				<ProductImagesCarousel images={product.images} />
			</aside>
			<div className="flex w-full  flex-col gap-10 md:w-1/3">
				<header className="hidden md:flex flex-col gap-1">
					<p className="flex flex-wrap gap-2 text-sm">
						{product.categories.map(category => (
							<span key={category.id}>{category.name}</span>
						))}
					</p>
					<h1 className="text-3xl">{product.name}</h1>
					<p className="text-lg font-medium">{product.price} €</p>
				</header>
				{product.variations.length > 0 && (
					<label htmlFor="variant">
						<h2 className="text-xl">Tipologia</h2>
						<select name="variant">
							{product.variations.map(variant => (
								<option key={variant} value="">
									{variant}
								</option>
							))}
						</select>
					</label>
				)}
				<div className="flex flex-col gap-3">
					<h2 className="text-xl">Descrizione</h2>
					<p>descrizione</p>
				</div>
				<Form method="post" className="flex flex-col gap-10">
					<input type="hidden" name="id" value={product.id} />
					<label htmlFor="quantity" className="flex justify-between gap-3">
						<h2 className="text-xl">Quantità</h2>
						<InputNumber name="quantity" />
					</label>
					<div className="flex flex-col items-center gap-2">
						<button
							type="submit"
							className="flex max-w-fit items-center justify-center gap-2 rounded-lg bg-[#228be6] px-4 py-2 font-semibold text-white transition-colors hover:bg-sky-600 active:translate-y-1"
						>
							Aggiungi al carrello
						</button>
						<Link
							to="/negozio"
							className="flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:underline"
						>
							Torna al negozio
						</Link>
					</div>
				</Form>
			</div>
		</article>
	)
}
