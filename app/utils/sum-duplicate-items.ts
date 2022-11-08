import { Cart } from '~/interfaces/cart.interface'

export function sumDuplicatesInCart(cartWithDuplicates: Cart) {
	return cartWithDuplicates.reduce((acc, currentItem) => {
		const accItem = acc.find(item => item.id === currentItem.id)

		if (accItem) {
			accItem.quantity += currentItem.quantity
		} else {
			acc.push(currentItem)
		}

		return acc
	}, [] as Cart)
}
