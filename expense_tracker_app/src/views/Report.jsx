// standard libraries
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

// external libraries

// internal libraries
import DoughnutChart from "../components/Chart"
import {
	setFilteredTransactions,
	fetchTransactions,
} from "../features/balance/balanceSlice"
export default function Report() {
	const dispatch = useDispatch()

	const { income, outcome, transactionsList, filterIncome, filterOutcome } =
		useSelector((state) => ({
			transactionsList: state.balance.transactionsList,
			income: state.balance.income,
			outcome: state.balance.outcome,
			filteredTransactions: state.balance.filteredTransactions,
			filterIncome: state.balance.filterIncome,
			filterOutcome: state.balance.filterOutcome,
		}))

	const totalInOut = ["Income", "Outcome"]
	const totalTitle = "Total expense"

	const [totalChartData, setTotalChartData] = useState([income, outcome])

	const [currentMonth, setCurrentMonth] = useState()
	const [currentYear, setCurrentYear] = useState()
	const [filteredData, setFilteredData] = useState("")

	const getCurrentDate = (
		// day = null,
		month = null,
		year = null,
	) => {
		// Get the current date
		const now = new Date()

		// const currentDay = day || now.getDate()
		const currentMonth = month || now.getMonth() + 1 // Months are zero-based
		const currentYear = year || now.getFullYear()

		return {
			month: String(currentMonth).padStart(2, "0"),
			year: String(currentYear),
		}
	}

	useEffect(() => {
		// Get the current month and year
		const { month, year } = getCurrentDate()

		// Set current month and year
		setCurrentMonth(month)
		setCurrentYear(year)

		// Set filteredData directly with the returned month and year
		setFilteredData(`${month}-${year}`)
	}, [])

	useEffect(() => {
		async function fetchData() {
			await dispatch(fetchTransactions())
		}
		fetchData()
	}, [dispatch])

	useEffect(() => {
		setTotalChartData([income, outcome])
	}, [income, outcome])

	useEffect(() => {
		// setFilteredChartData([filterIncome, filterOutcome])
		dispatch(setFilteredTransactions(filteredData))
	}, [dispatch, filteredData, filterIncome, filterOutcome, transactionsList])

	const handleDateTimeChange = () => {
		setFilteredData(`${currentMonth}-${currentYear}`)
	}

	/**
	 * filter btn click event handler
	 */
	const handleSubmitFilterTransactions = () => {
		setFilteredData(`${currentMonth}-${currentYear}`)

		dispatch(setFilteredTransactions(filteredData))
		// setFilteredChartData([filterIncome, filterOutcome])
	}
	const totalExpenseData = {
		labels: totalInOut,
		datasets: [
			{
				label: "Total expenses",
				data: totalChartData,
				backgroundColor: ["rgba(75, 192, 192, 0.4)", "rgba(255, 10, 50, 0.4)"],
				borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 10, 50, 1)"],
				borderWidth: 2,
			},
		],
	}

	const filterMonthYearData = {
		labels: totalInOut,
		datasets: [
			{
				label: "Total expenses",
				data: [filterIncome, filterOutcome],
				backgroundColor: ["rgba(75, 152, 192, 0.4)", "rgba(255, 10, 50, 0.4)"],
				borderColor: ["rgba(75, 152, 192, 1)", "rgba(255, 10, 50, 1)"],
				borderWidth: 2,
			},
		],
	}

	/**
	 *
	 * @returns them html template
	 */
	const renderDatePicker = () => (
		<div className='date-picker w-full mb-4 flex flex-col gap-1'>
			<label className='text-xs sub-title-color'>Filter:</label>

			<div className=' flex gap-2'>
				<div className='select-month'>
					<select
						className='px-4 py-2 border rounded-lg border-[#626262]'
						value={currentMonth}
						onChange={(e) => setCurrentMonth(e.target.value)}
						onBlur={handleDateTimeChange}
					>
						<option value='' disabled>
							Month
						</option>
						{Array.from({ length: 12 }, (_, i) => (
							<option key={i + 1} value={String(i + 1).padStart(2, "0")}>
								{i + 1}
							</option>
						))}
					</select>
				</div>
				<div className='select-year'>
					<select
						className='px-4 py-2 border rounded-lg border-[#626262]'
						value={currentYear}
						onChange={(e) => setCurrentYear(e.target.value)}
						onBlur={handleDateTimeChange}
					>
						<option value='' disabled>
							Year
						</option>
						{Array.from({ length: 20 }, (_, i) => (
							<option key={i} value={2034 - i}>
								{2034 - i}
							</option>
						))}
					</select>
				</div>
				<div className='submit flex-grow'>
					<button
						onClick={handleSubmitFilterTransactions}
						className='submit-btn w-full h-full flex items-center justify-center rounded-xl px-4 py-1 border'
					>
						<p>Filter</p>
					</button>
				</div>
			</div>
		</div>
	)

	return (
		<>
			<div className='report-container w-full h-full flex flex-col items-center mb-[100px]'>
				<div className='report-chart mt-4 flex justify-center w-[300px] tablet:w-[600px] tablet:h-[600px]'>
					<DoughnutChart
						chartTitle={totalTitle}
						labels={totalInOut}
						chartData={totalExpenseData}
					/>
				</div>
				<div className='divider w-[90%] h-[1px] bg-slate-400'></div>
				<div className='report-chart mt-4 flex flex-col items-center w-[300px] tablet:w-[600px] tablet:h-[600px]'>
					<div className='w-full'>{renderDatePicker()}</div>
					<DoughnutChart
						chartTitle={filteredData}
						labels={totalInOut}
						chartData={filterMonthYearData}
					/>
				</div>
			</div>
		</>
	)
}
