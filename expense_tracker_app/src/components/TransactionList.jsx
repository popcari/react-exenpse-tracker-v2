// standard libraries
import { useDispatch, useSelector } from "react-redux"

// internal libraries
import { setCurrentPage } from "../features/balance/balanceSlice"

import TransactionItem from "./TransactionItem"

export default function TransactionList() {
	const dispatch = useDispatch()

	const { transactionsList, currentPage, itemsPerPage, paginatedTransactions } =
		useSelector((state) => ({
			transactionsList: state.balance.transactionsList,
			currentPage: state.balance.currentPage,
			itemsPerPage: state.balance.itemsPerPage,
			paginatedTransactions: state.balance.paginatedTransactions,
		}))

	const totalPages = Math.ceil(transactionsList.length / itemsPerPage)

	const validatePageChange = (newPage, totalPages) => {
		if (newPage < 1 || newPage > totalPages) {
			return false // Invalid page number
		}
		return true // Valid page number
	}

	const handlePageChange = (newPage) => {
		if (validatePageChange(newPage, totalPages)) {
			dispatch(setCurrentPage(newPage))
		}
	}

	return (
		<div className='list p-2 max-h-[900px] overflow-y-scroll scroll-smooth'>
			{paginatedTransactions.map((transaction, id) => (
				<TransactionItem key={id} transaction={transaction} />
			))}
			{/* Pagination Controls */}
			<div className='pagination mt-6 flex justify-center'>
				<div
					className='prev-btn flex gap-1 items-center mr-5'
					onClick={() => handlePageChange(currentPage - 1)}
				>
					<img
						src='/img/left.png'
						alt=''
						className='hover:opacity-70 hover:scale-110 w-5 h-5 tablet:w-8 tablet:h-8'
					/>
				</div>
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						key={i + 1}
						onClick={() => handlePageChange(i + 1)}
						className={`px-3 py-2 leading-[150%] tablet:p-[8px_16px] mx-1 rounded-lg text-[12px] tablet:text-[16px] hover:opacity-70 hover:scale-110 ${currentPage === i + 1 ? "bg-[#26355D] text-white font-extrabold" : "bg-gray-300 text-black"}`}
					>
						{i + 1}
					</button>
				))}
				<div
					className='prev-btn flex gap-1 items-center ml-5'
					onClick={() => handlePageChange(currentPage + 1)}
				>
					<img
						src='/img/right.png'
						alt=''
						className='hover:opacity-70 hover:scale-110 w-5 h-5 tablet:w-8 tablet:h-8'
					/>
				</div>
			</div>
		</div>
	)
}
