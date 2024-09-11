import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import TransactionList from "../components/TransactionList"
import {
	setItemsPerPage,
	sortTransactions,
} from "../features/balance/balanceSlice"

export default function Transaction() {
	const dispatch = useDispatch()

	const { transactionsList } = useSelector((state) => ({
		transactionsList: state.balance.transactionsList,
	}))

	const maxPageOptionInit = [5, 10, 15, 10]

	const [sortType, setSortType] = useState("latest")
	const [maxItemPerPageOption, setMaxItemPerPageOption] = useState(10)

	const handleToggleSortType = () => {
		if (sortType === "latest") {
			setType("oldest")
		} else {
			setType("latest")
		}
	}
	function setType(type) {
		setSortType(type)
		dispatch(sortTransactions(type))
	}
	const onOptionChangeHandler = (event) => {
		setMaxItemPerPageOption(event.target.value)
		console.log("User Selected Value - ", event.target.value)
	}

	useEffect(() => {
		dispatch(setItemsPerPage(maxItemPerPageOption))
	}, [maxItemPerPageOption])
	return (
		<div className='mb-[100px]'>
			<div className='transaction--header flex justify-between items-center px-2 mb-2'>
				<div className='back flex justify-center items-center gap-1 w-8 h-8 rounded-lg border-[1px] border-[#0000005e]'>
					<svg
						width='20px'
						height='20px'
						viewBox='0 0 1024 1024'
						className='icon'
						xmlns='http://www.w3.org/2000/svg'
						fill='#0000005e'
						stroke='#0000005e'
						strokeWidth='20.48'
					>
						<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
						<g
							id='SVGRepo_tracerCarrier'
							strokeLinecap='round'
							strokeLinejoin='round'
						></g>
						<g id='SVGRepo_iconCarrier'>
							<path
								fill='#0000005e'
								d='M224 480h640a32 32 0 110 64H224a32 32 0 010-64z'
							></path>
							<path
								fill='#0000005e'
								d='M237.248 512l265.408 265.344a32 32 0 01-45.312 45.312l-288-288a32 32 0 010-45.312l288-288a32 32 0 1145.312 45.312L237.248 512z'
							></path>
						</g>
					</svg>{" "}
				</div>
				<div className='options flex items-center gap-2'>
					<div className='sort' onClick={handleToggleSortType}>
						<img
							src={
								sortType === "latest"
									? "/public/img/arrow-down.svg"
									: "/public/img/arrow-up.svg"
							}
							alt=''
							className='w-4 h-4'
						/>
					</div>
					<div className='limit'>
						<select
							onChange={onOptionChangeHandler}
							className='border-[1px] p-1 w-[60px] rounded-md'
						>
							<option>{maxItemPerPageOption}</option>
							{maxPageOptionInit.map((option, index) => {
								return <option key={index}>{option}</option>
							})}
						</select>
					</div>
				</div>
			</div>
			<TransactionList />
		</div>
	)
}
