interface TopBarProps {
	children: React.ReactNode
}

export default function TopBar(props: TopBarProps) {
	return (
		<aside className="w-full border-b border-zinc-200 py-2 text-center text-sm font-medium">
			{props.children}
		</aside>
	)
}
