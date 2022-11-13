import type { Session } from '@remix-run/cloudflare'
import type { Cart } from '~/interfaces/cart.interface'
import type { Product } from '~/interfaces/product.interface'

export const fromSession = (session: Session) => {
	if (!session.has('cart')) return {} as Cart

	return session.get('cart') as Cart
}

export const addInCart =
	(cart: Cart) => (itemId: Product['id'], itemQuantity: number) => {
		const currentItemQuantity = cart[itemId] || 0
		return {
			...cart,
			[itemId]: currentItemQuantity + itemQuantity,
		}
	}

export const deleteInCart = (cart: Cart) => (itemId: Product['id']) => {
	return delete cart[itemId]
}
