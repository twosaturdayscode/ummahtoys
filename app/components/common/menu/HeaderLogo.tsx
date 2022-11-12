import { Link } from '@remix-run/react'

export default function HeaderLogo() {
	return (
		<Link
			to="/"
			className="flex shrink-0 items-center gap-5 font-['Cera_Pro'] text-xl"
		>
			<img
				src="/assets/logo-only.png"
				alt="Logo di Ummah Toys, due pezzi di puzzle insieme"
				className="h-12"
			/>
			Ummah Toys
		</Link>
	)
}
