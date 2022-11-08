import { NavLink } from '@remix-run/react'
import { config } from '~/config/config'

export default function Nav() {
	return (
		<nav className="flex gap-7 font-medium">
			{config.menu.map((item, index) => (
				<div key={index}>
					<NavLink
						to={item.href}
						className={({ isActive }) => (isActive ? 'text-[#228be6]' : '')}
					>
						<span className="font-semibold capitalize">{item.label}</span>
					</NavLink>
				</div>
			))}
		</nav>
	)
}
