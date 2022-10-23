import type { AppLoadContext } from "@remix-run/cloudflare"
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages"
import * as build from "@remix-run/dev/server-build"
import { EnvSchema } from "./env"
import { WooService } from "./services/woocommerce"
import { createSessionStorage } from "./session"

const handleRequest = createPagesFunctionHandler({
	build,
	mode: process.env.NODE_ENV,
	getLoadContext: context => {
		// Environment variables
		const env: AppLoadContext["env"] = EnvSchema.parse(context.env)

		const services: AppLoadContext["services"] = {
			woocommerce: WooService({
				url: env.STORE_URL,
				consumerKey: env.CONSUMER_KEY,
				consumerSecret: env.CONSUMER_SECRET,
			}),
		}

		const sessionStorage = createSessionStorage({})

		return { env, services, sessionStorage }
	},
})

export function onRequest(context: EventContext<any, any, any>) {
	return handleRequest(context)
}
