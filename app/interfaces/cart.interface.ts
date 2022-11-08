import { Product } from './product.interface'

export interface CartItem {
	id: Product['id'] | string
	quantity: number
}

export type Cart = CartItem[]
