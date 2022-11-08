import { createCookieSessionStorage } from '@remix-run/cloudflare' // or cloudflare/deno
import { Env } from './env'

interface ICreateSessionStorage {
	env: Env
}

export const createSessionStorage = ({ env }: ICreateSessionStorage) =>
	createCookieSessionStorage({
		// a Cookie from `createCookie` or the CookieOptions to create one
		cookie: {
			name: '__session',

			// all of these are optional
			//domain: 'http://localhost',
			httpOnly: true,
			maxAge: 604_800,
			path: '/',
			sameSite: 'lax',
			secrets: [env.COOKIE_SECRET],
			secure: false,
		},
	})
