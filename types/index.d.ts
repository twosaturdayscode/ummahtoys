import '@remix-run/cloudflare'
import type { SessionStorage } from '@remix-run/cloudflare'
import type { Env } from '~/env'
import type { IWoocommerceService } from '~/services/woocommerce'

declare module '@remix-run/cloudflare' {
	export interface AppLoadContext {
		env: Env
		services: {
			woocommerce: IWoocommerceService
		}
		sessionStorage: SessionStorage
	}
}
