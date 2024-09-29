import { useState, useRef } from "react"
import { useSelector } from "react-redux"

export default function Profile() {
	const user = useSelector((state) => state.user.user)
	const dummyMobilePhone = "+84963271223"
	const dummyEmail = "dummy@gmail.com"

	const [isCollapsed, setIsCollapsed] = useState(true)
	const contentRef = useRef(null) // Dùng để tham chiếu đến phần tử cần điều chỉnh height

	function toggleCollapse() {
		setIsCollapsed(!isCollapsed)
	}

	return (
		<div className='profile p-[8px] mt-[16px]'>
			<section className='user-detail bg-[#3d3d3d] rounded-lg shadow-lg'>
				<div className='flex justify-between items-center px-4'>
					<div className='left flex flex-col items-start p-[8px] text-[#ffd154]'>
						<h1 className='text-[18px] font-semibold leading-[150%]'>{user}</h1>
						<h1 className='text-[14px] font-medium leading-[150%]'>
							{dummyMobilePhone}
						</h1>
						<h1 className='text-[14px] font-medium leading-[150%]'>
							{dummyEmail}
						</h1>
					</div>
					<div className='right p-[8px]'>
						<div className='w-20 h-20 bg-white rounded-full flex items-center justify-center'>
							<img src='/img/user.png' alt='' className='w-12 h-12' />
						</div>
					</div>
				</div>
			</section>

			{/* Bank Connect Section */}
			<section className='bank__connect p-4 bg-[#3d3d3d] mt-5 rounded-lg shadow-lg'>
				<div
					className='section-header flex justify-between items-center cursor-pointer text-white font-semibold'
					onClick={toggleCollapse}
				>
					<p className='text-[16px] font-bold leading-[150%] text-[#ffd154]'>
						Bank Connections
					</p>
					<span>
						<img
							src='/img/arrow-ups.svg'
							alt=''
							className={`${isCollapsed ? "rotate-180" : ""} w-8 p-1 transition-all duration-300 delay-100`}
						/>
					</span>
				</div>
				<div
					ref={contentRef}
					className={`content overflow-hidden transition-[max-height] duration-500 ease-in-out ${isCollapsed ? "max-h-0" : "max-h-[500px]"}`}
					style={{
						maxHeight: isCollapsed
							? "0px"
							: `${contentRef.current?.scrollHeight}px`,
					}}
				>
					<div className='items flex gap-4 mt-4'>
						<div className='item flex flex-col items-center justify-center p-1 rounded-md backdrop-blur-lg text-white'>
							<div className='p-2'>
								<img src='/img/bank.png' alt='' className='w-[44px]' />
							</div>
							<p className='text-[#ffd154] font-medium leading-[150%]'>Banks</p>
						</div>
						<div className='item flex flex-col items-center justify-center p-1 rounded-md backdrop-blur-lg text-white'>
							<div className='p-2'>
								<img src='/img/card.png' alt='' className='w-[44px]' />
							</div>
							<p className='text-[#ffd154] font-medium leading-[150%]'>Card</p>
						</div>
						<div className='item flex flex-col items-center justify-center p-1 rounded-md backdrop-blur-lg text-white'>
							<div className='p-2'>
								<img src='/img/more.png' alt='' className='w-[44px]' />
							</div>
							<p className='text-[#ffd154] font-medium leading-[150%]'>More</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
