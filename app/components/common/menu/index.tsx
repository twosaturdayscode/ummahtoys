interface HeaderProps {
	children: React.ReactNode
}

export const Menu = (props: HeaderProps) => {
	return (
		<header className="hidden md:flex w-full max-w-7xl mx-auto justify-between items-center p-5 px-10">
			{props.children}
		</header>
	)
}
