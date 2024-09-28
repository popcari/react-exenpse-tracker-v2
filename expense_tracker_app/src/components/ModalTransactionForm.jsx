// standard libraries
import { useState, useEffect } from "react"

// external libraries
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
// internal libraries
import { CATEGORY } from "../constants/constant"

import {
	addTransaction,
	fetchTransactions,
	editTransaction,
} from "../features/balance/balanceSlice"
import {
	resetTransactionItemData,
	toggleModalForm,
} from "../features/modal/modalSlice"

export default function ModalTransactionForm() {
	const dispatch = useDispatch()
	const { transactionItemData, isFormShow, modalTitle } = useSelector(
		(state) => state.modal,
	)

	// Function to get the current date in dd-mm-yyyy format
	const getCurrentDate = (day = null, month = null, year = null) => {
		// Get the current date
		const now = new Date()

		const currentDay = day || now.getDate()
		const currentMonth = month || now.getMonth() + 1 // Months are zero-based
		const currentYear = year || now.getFullYear()

		return {
			day: String(currentDay).padStart(2, "0"),
			month: String(currentMonth).padStart(2, "0"),
			year: currentYear,
		}
	}
	const { day, month, year } = getCurrentDate()

	// Initial form data with current date
	const initData = {
		type: "income",
		category: "unknown",
		amount: 0,
		created_at: `${day}-${month}-${year}`,
		note: "",
		_id: "",
	}

	const [formData, setFormData] = useState(initData)
	const [selectedDay, setSelectedDay] = useState(day)
	const [selectedMonth, setSelectedMonth] = useState(month)
	const [selectedYear, setSelectedYear] = useState(year)

	useEffect(() => {
		const [day, month, year] = formData.created_at.split("-")
		setSelectedDay(day)
		setSelectedMonth(month)
		setSelectedYear(year)
	}, [formData.created_at])

	useEffect(() => {
		if (!transactionItemData) {
			console.log("dcmm chua co gi")
		} else {
			// Re-assign fields in form
			handleTypeToggle(transactionItemData.type) // toggle type
			handleCategoryClick(transactionItemData.category) // category

			const existingItemDate = transactionItemData.created_at.split("-") // date
			setSelectedDay(existingItemDate[0])
			setSelectedMonth(existingItemDate[1])
			setSelectedYear(existingItemDate[2])

			// Update formData with amount and note, then dispatch action
			setFormData((prev) => ({
				...prev,
				amount: Number(transactionItemData.amount),
				note: transactionItemData.note,
			}))
		}
	}, [transactionItemData])

	useEffect(() => {
		if (!isFormShow) dispatch(resetTransactionItemData())
	}, [isFormShow])

	const handleTypeToggle = (type) => {
		setFormData((prev) => ({ ...prev, type }))
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleCategoryClick = (categoryName) => {
		setFormData((prev) => ({ ...prev, category: categoryName }))
	}

	const handleDateTimeChange = () => {
		if (selectedDay && selectedMonth && selectedYear) {
			setFormData((prev) => ({
				...prev,
				created_at: `${selectedDay}-${selectedMonth}-${selectedYear}`,
			}))
		}
	}

	// Type Toggle Component
	const renderTypeToggle = () => (
		<div className='input-field mb-4 flex flex-col gap-1'>
			<label className='text-xs sub-title-color'>Type:</label>
			<div className='toggle-tabs flex w-fit'>
				<div
					className={`tab-item cursor-pointer text-[14px] tablet:text-[18px] px-2 py-1 rounded-lg ${
						formData.type === "income" ? "income-bg active-tab" : "inactive-tab"
					}`}
					onClick={() => handleTypeToggle("income")}
				>
					Income
				</div>
				<div
					className={`tab-item cursor-pointer text-[14px] tablet:text-[18px] px-2 py-1 rounded-lg ${
						formData.type === "outcome"
							? "outcome-bg active-tab"
							: "inactive-tab"
					}`}
					onClick={() => handleTypeToggle("outcome")}
				>
					Outcome
				</div>
			</div>
		</div>
	)

	// Amount Input Field Component
	const renderAmount = () => (
		<div className='input-field mb-4 flex flex-col gap-1'>
			<label className='text-xs sub-title-color'>Amount:</label>
			<input
				type='number'
				name='amount'
				value={formData.amount}
				onChange={handleInputChange}
				className='border p-2 w-full'
			/>
		</div>
	)

	// Category Picker Component
	const renderCategoryPicker = () => (
		<div className='input-field flex flex-col gap-1'>
			<label className='text-xs sub-title-color'>Category:</label>
			<div className='category-grid grid grid-cols-4 tablet:grid-cols-6 gap-2 pb-4'>
				{CATEGORY.map((catItem) => (
					<div
						key={catItem.name}
						className={`category-item cursor-pointer flex flex-col items-center p-1 rounded-lg border ${
							formData.category === catItem.name
								? "border-[#FFB22C] border-[2px] box-border"
								: "border-gray-300"
						}`}
						onClick={() => handleCategoryClick(catItem.name)}
					>
						<img
							src={catItem.logo}
							alt={catItem.name}
							className='category-logo max-w-6 max-h-6 tablet:max-w-8 tablet:max-h-8'
						/>
						<p className='category-name max-h-2/6 text-[12px] tablet:text-[14px]'>
							{catItem.name.charAt(0).toUpperCase() + catItem.name.slice(1)}
						</p>
					</div>
				))}
			</div>
		</div>
	)

	// Date Picker Component
	const renderDatePicker = () => (
		<div className='date-picker mb-4 flex flex-col gap-1'>
			<label className='text-xs sub-title-color'>Date:</label>

			<div className=' flex gap-2'>
				<div className='select-day'>
					<select
						className='px-4 py-2 border rounded-lg'
						value={selectedDay}
						onChange={(e) => setSelectedDay(e.target.value)}
						onBlur={handleDateTimeChange}
					>
						<option value='' disabled>
							Day
						</option>
						{Array.from({ length: 31 }, (_, i) => (
							<option key={i + 1} value={String(i + 1).padStart(2, "0")}>
								{i + 1}
							</option>
						))}
					</select>
				</div>
				<div className='select-month'>
					<select
						className='px-4 py-2 border rounded-lg'
						value={selectedMonth}
						onChange={(e) => setSelectedMonth(e.target.value)}
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
						className='px-4 py-2 border rounded-lg'
						value={selectedYear}
						onChange={(e) => setSelectedYear(e.target.value)}
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
			</div>
		</div>
	)

	const renderNote = () => {
		return (
			<div className='input-field mb-4 flex flex-col gap-1'>
				<label className='text-xs sub-title-color'>Note:</label>
				<input
					type='text'
					name='note'
					value={formData.note}
					onChange={handleInputChange}
					className='border p-2 w-full'
				/>
			</div>
		)
	}

	const handleConfirmClick = () => {
		// validate amount
		if (Number(formData.amount) == 0) return

		try {
			if (transactionItemData) {
				// edit transaction
				const clone = Object.assign({}, formData)
				clone._id = transactionItemData._id
				dispatch(editTransaction(clone)) // Dispatch after setting formData
			} else {
				// create new transaction
				const clone = Object.assign({}, formData)
				clone._id = uuidv4().toString()
				dispatch(addTransaction(clone)) // Dispatch after setting formData
			}
			// re-fetch transactions list from database
			dispatch(fetchTransactions())
		} catch (e) {
			console.error(e)
		} finally {
			setTimeout(() => {
				onCancel()
			}, 300)
		}
	}

	const onResetFormData = () => {
		setFormData(initData)
	}

	const onCancel = () => {
		try {
			onResetFormData()
			setTimeout(() => {
				dispatch(toggleModalForm(false))
				dispatch(resetTransactionItemData())
			}, 500)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		const modalForm = document.querySelector(".modal__form")
		const formContainer = document.querySelector(".transaction-form")

		const handleClickOutside = (e) => {
			if (formContainer && !formContainer.contains(e.target)) {
				dispatch(toggleModalForm(false))
			}
		}

		modalForm.addEventListener("click", handleClickOutside)

		return () => {
			modalForm.removeEventListener("click", handleClickOutside) // Clean up the event listener
		}
	}, [])

	return (
		<div className='modal__form fixed h-screen top-0 bottom-0 right-0 left-0 bg-[#40404066] z-10'>
			<div className='modal-container w-full h-full px-5 tablet:px-10 flex items-center justify-center'>
				<div className='transaction-form rounded-xl p-4 bg-white w-full flex flex-col justify-between'>
					<div className='modal-header mx-2 h-[8%] border-b flex justify-between items-center'>
						<p className='text-[20px]'>{modalTitle}</p>
						<img
							src='/img/close.png'
							alt=''
							className='w-5 cursor-pointer hover:scale-110 transition-all duration-300 delay-100'
							onClick={onCancel}
						/>
					</div>
					<div className='modal-body h-[80%] p-2'>
						{renderTypeToggle()}
						{renderAmount()}
						{renderDatePicker()}
						{renderCategoryPicker()}
						{renderNote()}
					</div>
					<div className='modal-footer mr-2 float-left h-[8%]'>
						<div className='button-group flex gap-4 h-full items-center justify-end'>
							<div className='reset-btn full_center-btn px-3 py-2 !w-fit transition-all duration-500 ease-out delay-200'>
								<p className='' onClick={onResetFormData}>
									Reset
								</p>
							</div>
							<div className='cancel-btn full_center-btn px-3 py-2 !w-fit transition-all duration-500 ease-out delay-200'>
								<p className='' onClick={onCancel}>
									Cancel
								</p>
							</div>
							<div
								className={`submit-btn full_center-btn px-3 py-2 !w-fit transition-all duration-500 ease-out delay-200 ${Number(formData.amount) <= 0 ? "opacity-60" : ""}`}
								onClick={handleConfirmClick}
							>
								<p>Confirm</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
