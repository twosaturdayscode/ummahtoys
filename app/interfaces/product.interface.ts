export interface Product {
	id: number
	name: string
	slug: string
	permalink: string
	date_created: Date | string
	date_created_gmt: Date | string
	date_modified: Date | string
	date_modified_gmt: Date | string
	type: string
	status: string
	featured: boolean
	catalog_visibility: string
	description: string
	short_description: string
	sku: string
	price: string
	regular_price: string
	sale_price: string
	date_on_sale_from: Date | string
	date_on_sale_from_gmt: Date | string
	date_on_sale_to: Date | string
	date_on_sale_to_gmt: Date | string
	price_html: string
	on_sale: boolean
	purchasable: boolean
	total_sales: number
	virtual: boolean
	downloadable: boolean
	downloads: string[]
	download_limit: number
	download_expiry: number
	external_url: string
	button_text: string
	tax_status: string
	tax_class: string
	manage_stock: boolean
	stock_quantity: number
	stock_status: string
	backorders: string
	backorders_allowed: boolean
	backordered: boolean
	sold_individually: boolean
	weight: string
	dimensions: object
	shipping_required: boolean
	shipping_taxable: boolean
	shipping_class: string
	shipping_class_id: number
	reviews_allowed: boolean
	average_rating: string
	rating_count: number
	related_ids: string[]
	upsell_ids: string[]
	cross_sell_ids: string[]
	parent_id: number
	purchase_note: string
	categories: Category[]
	tags: Tag[]
	images: Image[]
	/*   attributes: string[]
  default_attributes: string[] */
	variations: string[]
	grouped_products: string[]
	menu_order: number
	meta_data: Metadata[]
}

interface Category {
	id: number
	name: string
	slug: string
}

interface Tag {
	id: number
	name: string
	slug: string
}

interface Image {
	id: number
	date_created: Date | string
	date_created_gmt: Date | string
	date_modified: Date | string
	date_modified_gmt: Date | string
	src: string
	name: string
	alt: string
}

interface Metadata {
	id: number
	key: string
	value: string
}
