// import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import ModalTransactionForm from "../components/ModalTransactionForm"
import { setModalTitle, toggleModalForm } from "../features/modal/modalSlice"

// components

export default function Footer() {
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const MODAL_TITLE = "Add Transaction"

	const { isFormShow } = useSelector((state) => ({
		isFormShow: state.modal.isFormShow,
	}))

	const applyColor = (route, type) => {
		if (type === "route") {
			return location.pathname === route
				? "main-color font-semibold"
				: "text-[#c4c4c4]"
		} else {
			return location.pathname === route ? "#FFB22C" : "#c4c4c4"
		}
	}

	const handleChangeRoute = (route) => {
		if (!route) return
		navigate(route)
	}

	const onAddTransactionBtnClick = () => {
		dispatch(setModalTitle(MODAL_TITLE))
		dispatch(toggleModalForm(true))
	}

	return (
		<div className='footer fixed bottom-0 left-0 right-0 bg-white h-[70px] tablet:h-24 rounded-t-xl'>
			<div className='footer__container flex gap-1 w-full h-full p-1 tablet:p-3'>
				<div className='left w-2/5 h-full flex items-center justify-evenly'>
					<div
						className='flex flex-col items-center'
						onClick={() => handleChangeRoute("/app/home")}
					>
						<svg
							width='32px'
							height='32px'
							viewBox='0 0 20 17'
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
							xmlnsXlink='http://www.w3.org/1999/xlink'
						>
							<g
								id='Icons'
								stroke='none'
								strokeWidth='1'
								fill='none'
								fillRule='evenodd'
							>
								<g id='Rounded' transform='translate(-816.000000, -289.000000)'>
									<g id='Action' transform='translate(100.000000, 100.000000)'>
										<g
											id='-Round-/-Action-//app-home'
											transform='translate(714.000000, 186.000000)'
										>
											<g transform='translate(0.000000, 0.000000)'>
												<polygon
													id='Path'
													points='0 0 24 0 24 24 0 24'
												></polygon>
												<path
													d='M10,19 L10,14 L14,14 L14,19 C14,19.55 14.45,20 15,20 L18,20 C18.55,20 19,19.55 19,19 L19,12 L20.7,12 C21.16,12 21.38,11.43 21.03,11.13 L12.67,3.6 C12.29,3.26 11.71,3.26 11.33,3.6 L2.97,11.13 C2.63,11.43 2.84,12 3.3,12 L5,12 L5,19 C5,19.55 5.45,20 6,20 L9,20 C9.55,20 10,19.55 10,19 Z'
													id='🔹Icon-Color'
													fill={applyColor("/app/home", "fill")}
												></path>
											</g>
										</g>
									</g>
								</g>
							</g>
						</svg>
						<p className={`text-xs ${applyColor("/app/home", "route")}`}>
							Home
						</p>
					</div>
					<div
						className='flex flex-col items-center'
						onClick={() => handleChangeRoute("/app/transaction")}
					>
						<svg
							fill={applyColor("/app/transaction", "fill")}
							width='32px'
							height='32px'
							viewBox='0 0 24.00 24.00'
							xmlns='http://www.w3.org/2000/svg'
						>
							<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
							<g
								id='SVGRepo_tracerCarrier'
								strokeLinecap='round'
								strokeLinejoin='round'
								stroke='#CCCCCC'
								strokeWidth='0.288'
							></g>
							<g id='SVGRepo_iconCarrier'>
								{" "}
								<path d='M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z'></path>{" "}
							</g>
						</svg>
						<p className={`text-xs ${applyColor("/app/transaction", "route")}`}>
							Transaction
						</p>
					</div>
				</div>
				<div className='middle w-1/5 h-full flex items-center justify-center'>
					<svg
						className='hover:scale-110 transition-all duration-200 cursor-pointer'
						width='56px'
						height='56px'
						viewBox='0 0 24 24'
						fill='#FFB22C'
						xmlns='http://www.w3.org/2000/svg'
						onClick={onAddTransactionBtnClick}
					>
						<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
						<g
							id='SVGRepo_tracerCarrier'
							strokeLinecap='round'
							strokeLinejoin='round'
						></g>
						<g id='SVGRepo_iconCarrier'>
							{" "}
							<g id='style=fill'>
								{" "}
								<g id='add-box'>
									{" "}
									<path
										id='Subtract'
										fillRule='evenodd'
										clipRule='evenodd'
										d='M1.25 8C1.25 4.27208 4.27208 1.25 8 1.25L16 1.25C19.7279 1.25 22.75 4.27208 22.75 8L22.75 16C22.75 19.7279 19.7279 22.75 16 22.75L8 22.75C4.27208 22.75 1.25 19.7279 1.25 16L1.25 8ZM12 7.00737C12.4142 7.00737 12.75 7.34316 12.75 7.75737L12.75 11.25L16.25 11.25C16.6642 11.25 17 11.5858 17 12C17 12.4142 16.6642 12.75 16.25 12.75L12.75 12.75L12.75 16.2426C12.75 16.6568 12.4142 16.9926 12 16.9926C11.5857 16.9926 11.25 16.6568 11.25 16.2426L11.25 12.75L7.76476 12.7499C7.35055 12.7499 7.01476 12.4142 7.01476 11.9999C7.01477 11.5857 7.35055 11.2499 7.76477 11.2499L11.25 11.25L11.25 7.75737C11.25 7.34315 11.5858 7.00737 12 7.00737Z'
										fill='#FFB22C'
									></path>{" "}
								</g>{" "}
							</g>{" "}
						</g>
					</svg>
				</div>
				<div className='right w-2/5 h-full flex justify-evenly items-center'>
					<div
						className='flex flex-col items-center'
						onClick={() => handleChangeRoute("/app/report")}
					>
						<svg
							width='32px'
							height='32px'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
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
									d='M12 1C11.7348 1 11.4804 1.10536 11.2929 1.29289C11.1054 1.48043 11 1.73478 11 2V12C11 12.5523 11.4477 13 12 13H22C22.5523 13 23 12.5523 23 12C23 10.5555 22.7155 9.12506 22.1627 7.79048C21.6099 6.4559 20.7996 5.24327 19.7782 4.22183C18.7567 3.20038 17.5441 2.39013 16.2095 1.83733C14.8749 1.28452 13.4445 1 12 1Z'
									fill={applyColor("/app/report", "fill")}
								></path>{" "}
								<path
									d='M9 4.51209C9 4.18747 8.84243 3.88305 8.57739 3.69562C8.31235 3.50819 7.97282 3.46107 7.66675 3.56925C3.78413 4.94156 1 8.64435 1 13C1 18.5228 5.47715 23 11 23C15.3556 23 19.0584 20.2158 20.4307 16.3332C20.5389 16.0272 20.4918 15.6876 20.3044 15.4226C20.1169 15.1575 19.8125 15 19.4879 15H11C9.89543 15 9 14.1045 9 13V4.51209Z'
									fill={applyColor("/app/report", "fill")}
								></path>{" "}
							</g>
						</svg>
						<p className={`text-xs ${applyColor("/app/report", "route")}`}>
							Report
						</p>
					</div>
					<div
						className='flex flex-col items-center'
						onClick={() => handleChangeRoute("/app/profile")}
					>
						<svg
							width='32px'
							height='32px'
							viewBox='0 0 24.00 24.00'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							stroke=''
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
									d='M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z'
									fill={applyColor("/app/profile", "fill")}
								></path>{" "}
								<path
									d='M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z'
									fill={applyColor("/app/profile", "fill")}
								></path>{" "}
							</g>
						</svg>
						<p className={`text-xs ${applyColor("/app/profile", "route")}`}>
							Profile
						</p>
					</div>
				</div>
			</div>
			{isFormShow && <ModalTransactionForm />}
		</div>
	)
}
