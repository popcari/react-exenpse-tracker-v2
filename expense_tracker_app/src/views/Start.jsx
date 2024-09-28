import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../features/user/userSlice"

import { LOCALDATA } from "../utils/localstorage"

export default function Start() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const user = useSelector((state) => state.user.user)

	const [isReady, setIsReady] = useState(false)
	const startTitle = "Expensify"
	const inputRef = useRef(null)

	function onStartBtnClick() {
		if (!user) return
		LOCALDATA("user", user)
		setIsReady(true)
	}

	function handleClose() {
		setIsReady(false)
	}

	function handleStartApp() {
		setTimeout(() => {
			navigate("app/home")
		}, 500)
	}

	useEffect(() => {
		if (isReady) return
		inputRef.current.focus()
	}, [isReady])

	useEffect(() => {
		const form = document.querySelector(".form__container")

		// click on form handler
		function handleClickForm(e) {
			if (form && form.contains(e.target)) {
				console.log("input form clicked")
				inputRef.current.focus()
			}
		}

		form?.addEventListener("click", handleClickForm)

		return () => {
			form?.removeEventListener("click", handleClickForm)
		}
	}, [])

	return (
		<div id='start' className='flex justify-center items-center relative'>
			<div className='form__container rounded-xl shadow-xl bg-white mobile:w-[400px] tablet:w-[600px] laptop:w-[700px] mobile:p-5 tablet:p-6 w-[340px]'>
				<form className='mobile:mb-4 tablet:mb-6 p-4'>
					<div className='title p-4 flex flex-col gap-2 items-center mobile:mb-5 tablet:mb-8'>
						<img src='/img/expensify.svg' className='w-20' alt='' />
						<p className='text-2xl font-semibold'>{startTitle}</p>
					</div>
					<input
						ref={inputRef}
						readOnly={isReady}
						className='rounded-lg p-2 w-full bg-slate-100'
						type='text'
						placeholder='Enter your name'
						onChange={(e) => dispatch(setUser(e.target.value))}
					/>
				</form>

				<div className='submit h-10 m-4' onClick={onStartBtnClick}>
					<button
						className={`submit-btn full_center-btn h-full uppercase transition-all delay-150 duration-200 ${!user || (isReady && "opacity-40")}`}
					>
						Start
					</button>
				</div>
			</div>
			<div
				className={`greeting shadow-2xl backdrop-blur-lg fixed bottom-0 rounded-t-3xl w-full bg-white ${
					isReady ? "show" : ""
				}`}
			>
				<div className='close absolute top-4 right-4' onClick={handleClose}>
					<img src='/img/close.png' alt='' />
				</div>
				<div className='p-4 w-full h-full flex flex-col items-center justify-center'>
					<p className='text-3xl leading-5 mb-4'>
						{`Hello `}
						<span className='text-[#FF8225] font-semibold'>{user}</span>
					</p>
					<p className='text-md' onClick={handleStartApp}>
						<button className='submit-btn full_center-btn w-full p-3 text-xl transition-all duration-300 hover:opacity-90'>
							Let get started
						</button>
					</p>
				</div>
			</div>
		</div>
	)
}
