import { json, LoaderArgs } from "@remix-run/cloudflare"
import { useLoaderData } from "@remix-run/react"

export const loader = async ({ context }: LoaderArgs) => {
	const products = await context.services.woocommerce.get("products")
	return json({ products })
}

export default function Index() {
	const { products } = useLoaderData()

	console.log(products)

	return (
		<>
			<div></div>
		</>
	)
}
