import { Link } from '@remix-run/react'
import { IconChevronRight } from '@tabler/icons'

const Hero = () => {
	return (
		<section className="mx-auto flex max-w-7xl flex-col-reverse px-8 py-5 md:flex-row">
			<div className="flex flex-col gap-6 text-center md:justify-center md:text-left">
				<h1 className="font-['Cera_Pro'] text-4xl font-black text-zinc-700 lg:text-6xl">
					Negozio online di giochi per bambini musulmani!
				</h1>
				<p className="text-xl text-gray-500">
					Il primo negozio online in Italia di giochi islamici per insegnare
					l’Islam agli eroi di domani, perchè imparare divertendosi si può.
				</p>
				<div className="flex w-full flex-row items-center justify-center gap-0 text-sm md:justify-start lg:text-base">
					<Link
						to="/negozio"
						className="flex items-center gap-2 rounded-lg bg-[#228be6] px-3 py-2 font-semibold text-white md:px-4 md:text-base"
					>
						<span>Val al negozio</span>
						<IconChevronRight className="hidden h-4 w-4 md:block" />
					</Link>
					<Link
						to="/chi-siamo"
						className="flex items-center gap-2 px-4 py-2 font-semibold hover:underline"
					>
						<span>Scopri chi siamo</span>
						<IconChevronRight className="hidden h-4 w-4 md:block" />
					</Link>
				</div>
			</div>
			<div className="flex h-full w-full items-center justify-center lg:h-96">
				<img
					src="/assets/hero-mom.svg"
					alt="Una mamma che legge un libro al suo bambino"
					className="h-full"
				/>
			</div>
		</section>
	)
}

export default Hero
