import type { Product } from '~/interfaces/product.interface'
import { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

interface ProductImagesCarouselProps {
	images: Product['images']
}

export default function ProductImagesCarousel({
	images,
}: ProductImagesCarouselProps) {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
	const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
		containScroll: 'keepSnaps',
		dragFree: true,
	})

	const onThumbClick = useCallback(
		index => {
			if (!embla || !emblaThumbs) return
			if (emblaThumbs.clickAllowed()) embla.scrollTo(index)
		},
		[embla, emblaThumbs]
	)

	const onSelect = useCallback(() => {
		if (!embla || !emblaThumbs) return
		setSelectedIndex(embla.selectedScrollSnap())
		emblaThumbs.scrollTo(embla.selectedScrollSnap())
	}, [embla, emblaThumbs, setSelectedIndex])

	useEffect(() => {
		if (!embla) return
		onSelect()
		embla.on('select', onSelect)
	}, [embla, onSelect])

	return (
		<>
			<div className="relative mx-auto max-w-2xl p-5">
				<div className="w-full overflow-hidden" ref={mainViewportRef}>
					<div className="flex touch-none select-none">
						{images.map((image, index) => (
							<div className="relative min-w-full pl-3" key={index}>
								<div className="relative h-96 overflow-hidden">
									<img
										className="h-full w-full object-contain"
										src={image.src}
										alt={image.alt}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="relative mx-auto max-w-2xl p-5">
				<div
					className="overflow-hidden rounded-md border p-2"
					ref={thumbViewportRef}
				>
					<div className="flex cursor-default touch-none select-none">
						{images.map((image, index) => (
							<Thumb
								onClick={() => onThumbClick(index)}
								selected={index === selectedIndex}
								imgSrc={image.src}
								imgAlt={image.alt}
								key={index}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

interface ThumbProps {
	selected: boolean
	onClick(): void
	imgSrc: string
	imgAlt: string
}

const Thumb = ({ selected, onClick, imgSrc, imgAlt }: ThumbProps) => (
	<div
		className={`rounded-md bg-zinc-50  h-20 w-20 aspect-square ${
			selected ? 'opacity-100' : 'opacity-20'
		}`}
	>
		<button
			onClick={onClick}
			className="relative cursor-pointer touch-manipulation overflow-hidden"
			type="button"
		>
			<img className="h-full w-full object-contain" src={imgSrc} alt={imgAlt} />
		</button>
	</div>
)
