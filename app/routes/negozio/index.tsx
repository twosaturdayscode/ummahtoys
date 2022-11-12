import type { LoaderArgs, SerializeFrom } from '@remix-run/cloudflare'
import type { Product } from '~/interfaces/product.interface'

import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { json } from '@remix-run/cloudflare'
import {
	Form,
	useLoaderData,
	useSearchParams,
	useSubmit,
	useTransition,
} from '@remix-run/react'
import ProductCard from '~/components/common/product-card'
import AddedItemToast from '~/components/negozio/added-item-toast'

export const loader = async ({ context, request }: LoaderArgs) => {
	const { services } = context
	const session = await context.sessionStorage.getSession(
		request.headers.get('Cookie')
	)

	const url = new URL(request.url)
	const categoryId = url.searchParams.get('category')

	const products = await services.woocommerce.get<Product[]>('products', {
		category: categoryId || '',
	})
	const categories = await services.woocommerce.get<Product['categories']>(
		'products/categories'
	)
	const message = session.get('message')

	return json(
		{ products, categories, message },
		{
			headers: {
				'Set-Cookie': await context.sessionStorage.commitSession(session),
			},
		}
	)
}

export default function NegozioIndex() {
	const { products, categories, message } =
		useLoaderData<SerializeFrom<typeof loader>>()
	const [searchParams] = useSearchParams()

	useEffect(() => {
		if (message) {
			toast.success(t => AddedItemToast({ t }), {
				duration: 3000,
				position: 'bottom-right',
				className: 'w-full flex gap-4 mx-auto md:mx-0 min-w-max',
			})
		}
	}, [message])

	const selectedCategoryId = searchParams.get('category')

	const submit = useSubmit()
	const transition = useTransition()

	return (
		<div className="flex flex-col gap-10 w-full">
			<header className="flex flex-col gap-5">
				<h1 className="text-3xl font-semibold md:text-4xl mb-5">Negozio</h1>
				<div className="flex items-center gap-3">
					<span className="text-lg font-medium">Filtri: </span>
					<Form
						method="get"
						replace
						onChange={e => submit(e.currentTarget, { replace: true })}
					>
						<select
							name="category"
							defaultValue={selectedCategoryId || 'default'}
						>
							<option value="default" disabled>
								Scegli una categoria
							</option>
							{categories.map(category => (
								<option key={category.id} value={category.id}>
									{category.name}
								</option>
							))}
						</select>
					</Form>
				</div>
			</header>
			<div className="flex w-full items-center justify-center">
				{transition.state === 'submitting' ? (
					<p>Cerco i prodotti...</p>
				) : products.length > 0 ? (
					productsList(products)
				) : (
					<p>Non ci sono prodotti per i filtri che hai selezionato :(</p>
				)}
			</div>
		</div>
	)
}

function productsList(products: Product[]) {
	return (
		<ul className="grid w-full grid-flow-row grid-cols-1 place-items-center gap-16 md:grid-cols-2 lg:grid-cols-4">
			{products.map(product => (
				<li key={product.id}>
					<ProductCard {...product} />
				</li>
			))}
		</ul>
	)
}
