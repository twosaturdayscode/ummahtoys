export interface IWoocommerceService {
	get<T>(endpoint: string): Promise<T>
	get<T>(endpoint: string, query: Record<string, any>): Promise<T>
}

interface InitProps {
	url: string
	consumerKey: string
	consumerSecret: string
}

export const WooService = (initProps: InitProps): IWoocommerceService => {
	const headers = new Headers()

	headers.append(
		'Authorization',
		'Basic ' + btoa(initProps.consumerKey + ':' + initProps.consumerSecret)
	)

	return {
		async get<T>(endpoint: string, query?: Record<string, string>): Promise<T> {
			const url = new URL(endpoint, initProps.url)

			if (query) {
				Object.keys(query).forEach(key =>
					url.searchParams.append(key, query[key])
				)
			}

			const response = await fetch(url.href, {
				headers,
			})

			return response.json<T>()
		},
	}
}
