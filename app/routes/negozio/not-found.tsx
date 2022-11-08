import { Link } from '@remix-run/react'

export default function NotFoundPage() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-5 py-10">
			<p className="text-2xl">Che strano, non c'è nessun prodotto qui!</p>
			<Link to={'/negozio'} className="hover:underline">
				Torna al negozio
			</Link>
		</div>
	)
}
