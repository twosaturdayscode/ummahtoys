import type { Product } from './product.interface'

export type Cart = Record<Product['id'], number>
