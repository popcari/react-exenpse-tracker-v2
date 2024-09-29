import { Routes, Route } from "react-router-dom"

// Các view
import Home from "./views/Home"
import Transaction from "./views/Transaction"
import Report from "./views/Report"
import Profile from "./views/Profile"

// layout
import Header from "./Layout/Header"
import Footer from "./Layout/Footer"

export default function App() {
	return (
		<div>
			{/* Các route con của App */}
			<Header />
			<Routes>
				<Route path='home' element={<Home />} />
				<Route path='transaction' element={<Transaction />} />
				<Route path='report' element={<Report />} />
				<Route path='profile' element={<Profile />} />
				{/* Thêm các route con khác tại đây nếu cần */}
			</Routes>
			<Footer />
		</div>
	)
}
