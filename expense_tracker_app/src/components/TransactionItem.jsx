// external libraries
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"

// internal libraries
import { formatNumberWithDots } from "../utils/number"
import {
	toggleModalForm,
	setTransactionItemData,
} from "../features/modal/modalSlice"
import { setModalTitle } from "../features/modal/modalSlice"

TransactionItem.propTypes = {
	transaction: PropTypes.object,
}

export default function TransactionItem({ transaction }) {
	const dispatch = useDispatch()
	const MODAL_TITLE = "Edit Transaction"

	const handleEditTransactionItem = () => {
		dispatch(setModalTitle(MODAL_TITLE))
		dispatch(setTransactionItemData(transaction))
		dispatch(toggleModalForm(true))
	}
	const handleDeleteTransactionItem = () => {}

	return (
		<div
			className={`item flex justify-between bg-white mb-4 pl-3 py-2 rounded-xl shadow-md border-r-[20px] ${transaction.type === "income" ? "border-green-500" : "border-red-500"}`}
		>
			<div className='left flex items-center gap-2'>
				<img src={transaction.logo} alt='' className='h-7' />
				<div className='flex flex-col'>
					<p className='text-[14px] uppercase font-semibold'>
						{transaction.category}
					</p>
					<p className='text-[10px]'> {transaction.created_at}</p>
				</div>
			</div>
			<div className='right flex items-center'>
				<p
					className={`text-lg tablet:text-xl font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
				>
					{`${transaction.type === "income" ? "+" : "-"}${formatNumberWithDots(Number(transaction.amount))}`}
				</p>
				<div className='options ml-2 flex items-center p-1 gap-2'>
					<svg
						className='fill-blue-500 hover:fill-blue-600'
						width='24px'
						height='24px'
						viewBox='-4 0 32 32'
						version='1.1'
						xmlns='http://www.w3.org/2000/svg'
						onClick={handleEditTransactionItem}
					>
						<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
						<g
							id='SVGRepo_tracerCarrier'
							strokeLinecap='round'
							strokeLinejoin='round'
						></g>
						<g id='SVGRepo_iconCarrier'>
							{" "}
							<title>edit</title>{" "}
							<path d='M17.438 22.469v-4.031l2.5-2.5v7.344c0 1.469-1.219 2.688-2.656 2.688h-14.625c-1.469 0-2.656-1.219-2.656-2.688v-14.594c0-1.469 1.188-2.688 2.656-2.688h14.844v0.031l-2.5 2.469h-11.5c-0.531 0-1 0.469-1 1.031v12.938c0 0.563 0.469 1 1 1h12.938c0.531 0 1-0.438 1-1zM19.813 7.219l2.656 2.656 1.219-1.219-2.656-2.656zM10.469 16.594l2.625 2.656 8.469-8.469-2.625-2.656zM8.594 21.094l3.625-0.969-2.656-2.656z'></path>{" "}
						</g>
					</svg>
					<svg
						width='24px'
						height='24px'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						stroke='red'
						onClick={handleDeleteTransactionItem}
					>
						<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
						<g
							id='SVGRepo_tracerCarrier'
							strokeLinecap='round'
							strokeLinejoin='round'
						></g>
						<g id='SVGRepo_iconCarrier'>
							{" "}
							<path
								d='M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z'
								className='fill-red-500 hover:fill-red-600'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							></path>{" "}
						</g>
					</svg>
				</div>
			</div>
		</div>
	)
}
