import type { Product } from '~/interfaces/product.interface'
import ProductCard from '~/components/common/product-card'

interface FeaturedProps {
	products: Product[]
}

const FeaturedProducts = (props: FeaturedProps) => {
	return (
		<section className="flex flex-col gap-8 mx-max-w-4xl items-center px-10">
			<header className="flex flex-col gap-3 text-center">
				<h2 className="text-3xl font-semibold">
					Cresci tuo figlio nel migliore dei modi!
				</h2>
				<p className="text-zinc-500">
					Il nostro obiettivo è fornire ai genitori risorse islamiche di qualità
					che trasmettano i valori musulmani ai bambini di oggi.
				</p>
			</header>
			<hr className="w-1/4 bg-stone-500 h-0.5 rounded-lg" />
			<ul className="flex flex-col md:flex-row justify-evenly gap-7">
				{props.products.map(product => (
					<li key={product.name}>
						<ProductCard {...product} />
					</li>
				))}
			</ul>
		</section>
	)
}

export default FeaturedProducts
