import { Link } from '@remix-run/react'
import PaymentsIcons from './PaymentIcons'
import SocialLInks from './SocialLinks'

export const Footer = () => {
	return (
		<footer className="mx-auto mt-20 flex max-w-7xl flex-col items-center gap-7 px-10">
			<hr className="h-px w-3/4 rounded-xl bg-gray-300" />
			<div className="flex flex-col gap-4 self-start md:mx-auto md:text-center mb-5">
				<span className="font-medium">Link utili</span>
				<ul className="flex flex-col md:flex-row gap-4 text-zinc-600 font-semibold">
					<li className="hover:underline">
						<Link to={'/donazioni'}>Donazioni</Link>
					</li>
					<li className="hover:underline">
						<Link to={'/contatti'}>Contatti</Link>
					</li>
					<li className="hover:underline">
						<Link to={'/termini-di-reso'}>Termini di reso</Link>
					</li>
					<li className="hover:underline">
						<Link to={'/termini-di-servizio'}>Termini di servizio</Link>
					</li>
					<li className="hover:underline">
						<Link to={'/privacy'}>Privacy</Link>
					</li>
				</ul>
			</div>
			<div className="flex w-full  flex-col-reverse items-stretch justify-between gap-10 md:flex-row">
				<div className="mx-auto flex w-full max-w-fit items-start justify-between gap-12">
					<img
						src={'/assets/logo.png'}
						alt="Ummah Toys logo"
						className="hidden w-44 object-contain md:block"
					/>
				</div>
				<div className="md:mx-auto flex max-w-xs flex-col gap-4">
					<p className="font-bold">La nostra mission</p>
					<p className="flex flex-col gap-2 text-sm font-light">
						Vogliamo permettere ad ogni bambino musulmano in Italia, tramite i
						nostri prodotti, di poter imparare l&apos;islam in maniera facile,
						intuitiva e divertente. Una Ummah forte lo è dai primi passi.
					</p>
				</div>
			</div>
			<SocialLInks />
			<div className="mb-14 flex w-full flex-col items-center gap-3 border-t-[0.5px] p-5 md:mb-0">
				<PaymentsIcons />
				<p className="text-xs text-gray-400">
					© {new Date().getFullYear()} - Ummah Toys. Fatto con ❤️ da{' '}
					<a
						href="https://twitter.com/dignify_space"
						target="_blank"
						className="underline"
						rel="noreferrer"
					>
						Dignify
					</a>
					. P.IVA: 11570680964 - Denominazione: BEST OF ME DI MAZEN HUSSEIN
				</p>
			</div>
		</footer>
	)
}
