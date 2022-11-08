import { IconMinus, IconPlus } from '@tabler/icons'
import { useCallback, useEffect, useRef, useState } from 'react'

interface InputNumberProps {
	name: string
	initialValue?: number
	mode?: 'controlled' | 'uncontrolled'
	onIncrease?(): void
	onDecrease?(): void
}

export default function InputNumber(props: InputNumberProps) {
	const [number, setNumber] = useState<number>(props.initialValue || 1)

	function handleMinus() {
		if (number === 1) {
			return
		}

		if (props.onDecrease) props.onDecrease()

		setNumber(s => s - 1)
	}

	function handlePlus() {
		if (props.onIncrease) props.onIncrease()
		setNumber(s => s + 1)
	}

	return (
		<div className="flex w-28 select-none items-center border border-zinc-800 p-1">
			<button
				type={props.mode === 'uncontrolled' ? 'submit' : 'button'}
				name="_action"
				value="decrease"
				onClick={handleMinus}
				disabled={number === 1}
				className={`p-2 ${number === 1 ? 'opacity-40' : ''}`}
			>
				<IconMinus className="h-4 w-4" />
			</button>
			<p className="w-full text-center select-none">{number}</p>
			<input type="hidden" name={props.name} value={number} readOnly />
			<button
				type={props.mode === 'uncontrolled' ? 'submit' : 'button'}
				name="_action"
				value="increase"
				onClick={handlePlus}
				className="p-2"
			>
				<IconPlus className="h-4 w-4" />
			</button>
		</div>
	)
}
