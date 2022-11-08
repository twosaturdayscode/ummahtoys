import { Link } from '@remix-run/react'
import { Toast } from 'react-hot-toast'

interface AddedItemToastProps {
	t: Toast
}

export default function AddedItemToast({ t }: AddedItemToastProps) {
	return (
		<div className="flex justify-between gap-4 items-center">
			<header className="font-medium w-full">Prodotto aggiunto! 🎉</header>
			<div className="shrink-0">
				<Link
					to="/carrello"
					className="text-sm bg-green-500 py-1 px-2 rounded font-semibold text-white"
				>
					<span>Vai al carrello</span>
				</Link>
			</div>
		</div>
	)
}
