import { Link } from '@remix-run/react'
import { IconShoppingCart } from '@tabler/icons'

interface CartButtonProps {
	cartItemsNumber: number
}

export default function CartButton(props: CartButtonProps) {
	return (
		<Link to="carrello" className="relative block p-2">
			<span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#228be6] text-xs font-semibold text-white">
				{props.cartItemsNumber}
			</span>
			<IconShoppingCart className="h-7 w-7" />
		</Link>
	)
}
