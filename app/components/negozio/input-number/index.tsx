import { IconMinus, IconPlus } from '@tabler/icons'
import { useState } from 'react'
interface InputNumberProps {
	name: string
	initialValue?: number
	onIncrease?(): void
	onDecrease?(): void
}
export default function InputNumber(props: InputNumberProps) {
	const [number, setNumber] = useState<number>(props.initialValue || 1)

	function handleMinus() {
		if (number === 1) {
			return
		}
		setNumber(s => s - 1)

		if (props.onDecrease) {
			props.onDecrease()
		}
	}

	function handlePlus() {
		if (number === 15) return

		setNumber(s => s + 1)

		if (props.onIncrease) {
			props.onIncrease()
		}
	}

	return (
		<div className="flex w-28 select-none items-center border border-zinc-800 p-1">
			<button
				onClick={handleMinus}
				disabled={number === 1}
				className={`p-2 ${number === 1 ? 'opacity-40' : ''}`}
				type="button"
			>
				<IconMinus className="h-4 w-4" />
			</button>
			<input
				className="w-full px-1 text-center select-none appearance-none border-none focus:ring-0 outline-none"
				name={props.name}
				type="text"
				value={number}
				readOnly
			/>
			<button
				onClick={handlePlus}
				className={`p-2 ${number === 15 ? 'opacity-40' : ''}`}
				type="button"
			>
				<IconPlus className="h-4 w-4" />
			</button>
		</div>
	)
}
