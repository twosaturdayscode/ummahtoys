import {
	AppLoadContext,
	createCookieSessionStorage,
} from "@remix-run/cloudflare" // or cloudflare/deno

interface ICreateSessionStorage {
	context?: AppLoadContext
}

export const createSessionStorage = ({ context }: ICreateSessionStorage) =>
	createCookieSessionStorage({
		// a Cookie from `createCookie` or the CookieOptions to create one
		cookie: {
			name: "__session",

			// all of these are optional
			//domain: 'http://localhost',
			httpOnly: true,
			maxAge: 604_800,
			path: "/",
			sameSite: "lax",
			/* secrets: context?.env.COOKIE_SECRET
				? [context.env.COOKIE_SECRET]
				: undefined,
			secure: !!context?.env.COOKIE_SECRET, */
		},
	})
