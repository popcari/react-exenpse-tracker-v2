// standard libraries
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// internal libraries
import { CURRENCY } from "../constants/constant"
import { setCurrentPage } from "../features/balance/balanceSlice"
import { formatNumberWithDots } from "../utils/number"
import TransactionList from "../components/TransactionList"

export default function Home() {
	const dispatch = useDispatch()

	const { totalBalance, income, outcome } = useSelector((state) => ({
		totalBalance: state.balance.totalBalance,
		income: state.balance.income,
		outcome: state.balance.outcome,
	}))

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
		dispatch(setCurrentPage(1))
	}, [dispatch])

	return (
		<>
			<div
				id='home'
				className='home overflow-x-hidden w-screen h-screen bg-slate-100 scroll-smooth'
			>
				<section className='balance w-full mt-6 px-4'>
					<div className='balance__container main_gradient_tab transition-all duration-200 mx-auto p-4 tablet:p-5 rounded-xl w-full tablet:w-[560px] bg-slate-100 text-center flex flex-col gap-4'>
						<p className='text-2xl font-normal text-[#e9e9e9] flex justify-center items-center gap-2'>
							Total balance{" "}
							<span onClick={handleToggleBalace}>
								<img
									src={`/img/${isShowBalance ? "eye-open" : "eye"}.png`}
									alt=''
									className='w-8 tablet:w-10'
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

				<section className='transaction w-full mt-6 px-4'>
					<div className='balance__container transition-all duration-200 mx-auto p-4 tablet:p-5 rounded-xl w-full tablet:w-[560px] shadow-lg text-center flex gap-2'>
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
					<TransactionList />
				</section>
			</div>
		</>
	)
}
