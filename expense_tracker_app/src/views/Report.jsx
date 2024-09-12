// standard libraries
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// external libraries

// internal libraries
import DoughnutChart from "../components/Chart"
import {
	setCurrentPage,
	fetchTransactions,
} from "../features/balance/balanceSlice"
export default function Report() {
	const dispatch = useDispatch()

	const { transactionsList, currentPage, itemsPerPage, paginatedTransactions } =
		useSelector((state) => ({
			transactionsList: state.balance.transactionsList,
			currentPage: state.balance.currentPage,
			itemsPerPage: state.balance.itemsPerPage,
			paginatedTransactions: state.balance.paginatedTransactions,
		}))

	return (
		<>
			<div className='report-container w-full h-full flex flex-col items-center'>
				<div className='report-chart mt-4 w-[375px] tablet:w-[600px] tablet:h-[600px]'>
					<DoughnutChart />
				</div>
			</div>
		</>
	)
}
