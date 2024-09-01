import { useState, useEffect } from "react"

import { CURRENCY } from "../constants/constant"

export default function Home() {
	const [hello, setHello] = useState("ff")

	useEffect(() => {
		setTimeout(() => {
			setHello("dcmm")
		}, 2000)
	}, [])

	return (
		<>
			<div>{hello}</div>
			<div>{CURRENCY}</div>
		</>
	)
}
