import type { Cart } from '~/interfaces/cart.interface'

export function getCartLength(cart: Cart) {
	return Object.keys(cart).length
}
