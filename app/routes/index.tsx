import type { LoaderArgs, SerializeFrom } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import FeaturedProducts from '~/components/home/featured-products'
import Features from '~/components/home/features'
import Hero from '~/components/home/hero'
import Jumbotron from '~/components/home/jumbotron'
import type { Product } from '~/interfaces/product.interface'

export const loader = async ({ context }: LoaderArgs) => {
	const featured = await context.services.woocommerce.get<Product[]>(
		'products',
		{
			featured: true,
		}
	)

	return json({ featured })
}

export default function Index() {
	const { featured } = useLoaderData<SerializeFrom<typeof loader>>()

	return (
		<div className="space-y-24">
			<Hero />
			<FeaturedProducts products={featured} />
			<Jumbotron />
			<Features />
		</div>
	)
}
