import type {
	MetaFunction,
	LinksFunction,
	LoaderArgs,
} from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useFetchers,
	useLoaderData,
	useTransition,
} from '@remix-run/react'

import { Toaster } from 'react-hot-toast'
import { Footer } from './components/common/footer'
import { Menu } from './components/common/menu'
import CartButton from './components/common/menu/CartButton'
import HeaderLogo from './components/common/menu/HeaderLogo'
import Nav from './components/common/menu/Nav'
import type { Cart } from './interfaces/cart.interface'
import { getCartLength } from '~/utils/get-cart-length'
import NProgress from 'nprogress'

import nProgressStyles from 'nprogress/nprogress.css'
import styles from './tailwind.css'
import { useEffect, useMemo } from 'react'

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'New Remix App',
	viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: styles },
	{ rel: 'stylesheet', href: nProgressStyles },
]

export const loader = async ({ context, request }: LoaderArgs) => {
	const session = await context.sessionStorage.getSession(
		request.headers.get('Cookie')
	)
	const sessionCart = session.get('cart') as Cart
	if (sessionCart) {
		const cartLength = getCartLength(sessionCart)
		return json({ cartItemsNumber: cartLength })
	}

	return json({ cartItemsNumber: 0 })
}

export default function App() {
	const { cartItemsNumber } = useLoaderData<typeof loader>()

	const transition = useTransition()

	const fetchers = useFetchers()

	/**
	 * This gets the state of every fetcher active on the app and combine it with
	 * the state of the global transition (Link and Form), then use them to
	 * determine if the app is idle or if it's loading.
	 * Here we consider both loading and submitting as loading.
	 */
	const state = useMemo<'idle' | 'loading'>(
		function getGlobalState() {
			let states = [transition.state, ...fetchers.map(fetcher => fetcher.state)]
			if (states.every(state => state === 'idle')) return 'idle'
			return 'loading'
		},
		[transition.state, fetchers]
	)

	useEffect(() => {
		// and when it's something else it means it's either submitting a form or
		// waiting for the loaders of the next location so we start it
		if (state === 'loading') NProgress.start()
		// when the state is idle then we can to complete the progress bar
		if (state === 'idle') NProgress.done()
	}, [transition.state, state])

	return (
		<html lang="it">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Menu>
					<HeaderLogo />
					<Nav />
					<CartButton cartItemsNumber={cartItemsNumber} />
				</Menu>

				<Outlet />
				<Footer />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />

				<Toaster />
			</body>
		</html>
	)
}
