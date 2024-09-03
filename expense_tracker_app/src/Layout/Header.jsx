export default function Header() {
	return (
		<section className='home__header transition-all duration-300 flex px-2 justify-between delay-100 w-full h-14 tablet:h-20'>
			<div className='home__header--left p-2 flex gap-1 items-center'>
				<img src='/img/expensify.svg' alt='' className='h-full' />
				<div className='title flex flex-col justify-around h-full text-white'>
					<p className='title text-xs tablet:text-xl font-semibold leading-[150%]'>
						Expensify
					</p>
					<p className='sub-title text-[10px] tablet:text-sm'>Saving is good</p>
				</div>
			</div>
			<div className='home__header--right'>
				<img src='/img/setting.svg' alt='' className='h-full py-3' />
			</div>
		</section>
	)
}
