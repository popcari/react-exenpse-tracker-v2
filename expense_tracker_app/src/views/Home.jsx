// standard libraries
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// internal libraries
import { CURRENCY } from "../constants/constant"
import { fetchTransactions } from "../features/balance/balanceSlice"
import { formatNumberWithDots } from "../utils/number"
import { formatDate } from "../utils/date"

export default function Home() {
	const dispatch = useDispatch()

	const { totalBalance, income, outcome, transactionsList } = useSelector(
		(state) => ({
			totalBalance: state.balance.totalBalance,
			income: state.balance.income,
			outcome: state.balance.outcome,
			transactionsList: state.balance.transactionsList,
		}),
	)

	const [isShowBalance, setIsShowBalance] = useState(true)
	const hiddenBalance = "**********"

	const transactionTypeTabs = [
		{
			type: "income",
			logo: "/img/plus.png",
			value: income,
		},
		{
			type: "outcome",
			logo: "/img/minus.png",
			value: outcome,
		},
	]

	/**
	 * toggle hide/show balance event handler
	 */
	const handleToggleBalace = () => {
		setIsShowBalance((prev) => !prev)
	}

	/**
	 * get transactions list
	 */
	useEffect(() => {
		dispatch(fetchTransactions())
	}, [dispatch])

	// const handleAddTransaction = async () => {
	// 	const newTransaction = {
	// 		type: "outcome",
	// 		amount: 2000,
	// 		category: "insurance",
	// 		created_at: new Date().toISOString(),
	// 	}
	// 	await dispatch(addTransaction(newTransaction))
	// }
	return (
		<>
			<div
				id='home'
				className='home overflow-x-hidden w-screen h-screen bg-slate-100 scroll-smooth'
			>
				<section className='balance w-full mt-6'>
					<div className='balance__container main_gradient_tab transition-all duration-200 mx-auto p-4 tablet:p-5 rounded-xl w-[360px] tablet:w-[560px] bg-slate-100 text-center flex flex-col gap-4'>
						<p className='text-2xl font-normal text-[#e9e9e9] flex justify-center items-center gap-2'>
							Total balance{" "}
							<span onClick={handleToggleBalace}>
								<img
									src={`/img/${isShowBalance ? "eye-open" : "eye"}.png`}
									alt=''
									className='w-8 tablet:w-14'
								/>
							</span>
						</p>
						<p className='text-4xl font-bold text-white'>
							{isShowBalance ? (
								<>
									{`${formatNumberWithDots(totalBalance) ?? 0} `}
									<span className=''>{CURRENCY}</span>
								</>
							) : (
								<p>{hiddenBalance}</p>
							)}
						</p>
					</div>
				</section>

				<section className='transaction w-full mt-6'>
					<div className='balance__container transition-all duration-200 mx-auto p-4 tablet:p-5 rounded-xl w-[360px] tablet:w-[560px] shadow-lg text-center flex gap-2'>
						{transactionTypeTabs.map((transaction) => (
							<div
								key={transaction.type}
								className='income w-1/2 flex items-center gap-3 border-spacing-4 border-[1px] p-2 rounded-lg border-gray-300'
							>
								<img src={transaction.logo} alt='' className='w-10 h-10' />
								<div className='flex flex-col justify-between items-start'>
									<p className='text-[14px] tablet:text-lg font-semibold uppercase '>
										{transaction.type}
									</p>

									<p className='text-[10px] tablet:text-sm font-medium leading-[100%]'>
										{formatNumberWithDots(transaction.value)}{" "}
										<span>{CURRENCY}</span>
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				<section className='transaction-list mt-4 w-full mb-[100px]'>
					<h1 className='text-[#9BA1A8] text-[20px] tablet:text-[24px] px-2 leading-9 font-medium mb-2'>
						Total transaction
					</h1>
					{transactionsList.length > 0 ? (
						<div className='list p-2 max-h-[900px] overflow-y-scroll scroll-smooth'>
							{transactionsList.map((transaction, id) => (
								<div
									key={id}
									className={`item flex justify-between bg-white mb-4 px-3 py-1 rounded-xl shadow-md border-r-[20px] ${transaction.type === "income" ? "border-green-500" : "border-red-500"}`}
								>
									<div className='left flex items-center gap-2'>
										<img src={transaction.logo} alt='' className='h-3/5' />
										<div className='flex flex-col'>
											<p className='text-[18px] uppercase font-semibold'>
												{transaction.category}
											</p>
											<p className='text-[12px]'>
												{" "}
												{formatDate(transaction.created_at)}
											</p>
										</div>
									</div>
									<div className='right flex items-center'>
										<p
											className={`text-xl tablet:text-3xl font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
										>
											{formatNumberWithDots(transaction.amount)}
										</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='empty__container flex flex-col pt-10 justify-center items-center'>
							<img src='/img/empty.png' alt='' />
							<p className='text-[12px] tablet:text-[16px] text-gray-400 font-light'>
								No transactions
							</p>
						</div>
					)}
				</section>
			</div>
		</>
	)
}
