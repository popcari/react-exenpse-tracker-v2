import { useState, useEffect } from "react"

import { CURRENCY } from "../constants/constant"

export default function Home() {
	useEffect(() => {
		setTimeout(() => {
			// setHello("dcmm")
		}, 2000)
	}, [])

	return (
		<>
			<div
				id='home'
				className='home overflow-x-hidden w-screen h-screen bg-[#FFD18E]'
			></div>
		</>
	)
}
