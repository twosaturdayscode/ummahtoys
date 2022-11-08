import { Link } from '@remix-run/react'
import type { Product } from '~/interfaces/product.interface'

interface ProductCardProps {
	name: Product['name']
	slug: Product['slug']
	images: Product['images']
	categories: Product['categories']
	price: Product['price']
	stock_quantity: Product['stock_quantity']
}

const ProductCard = (product: ProductCardProps) => {
	return (
		<article className="group relative">
			<Link
				to={`/negozio/${product.slug}`}
				className="peer relative block transform cursor-pointer overflow-hidden rounded transition-all group-hover:scale-105"
			>
				{product.images[0].src && (
					<img
						alt={product.images[0].alt}
						className="block h-56 w-72 object-cover"
						src={product.images[0].src}
					/>
				)}
			</Link>
			<div className="mt-4 flex flex-col gap-1">
				{product.categories[0].name && (
					<p className="text-xs tracking-widest text-gray-500">
						{product.categories[0].name}
					</p>
				)}
				<Link
					to={`/negozio/${product.slug}`}
					className="hover:underline group-hover:underline"
				>
					<h2>{product.name}</h2>
				</Link>
				<p className="text-lg font-light tracking-wide">€{product.price}</p>
			</div>
			{product.stock_quantity <= 0 && (
				<div className="absolute top-3 -right-3 transform rounded bg-red-500 py-1 px-2 text-sm text-white transition group-hover:-translate-y-2">
					Esaurito
				</div>
			)}
		</article>
	)
}

export default ProductCard
