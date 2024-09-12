import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

import {
	setCurrentPage,
	fetchTransactions,
} from "../features/balance/balanceSlice"
// Đăng ký các thành phần từ chart.js
ChartJS.register(ArcElement, Tooltip, Legend)

export default function DoughnutChart() {
	const dispatch = useDispatch()

	const { transactionsList, currentPage, itemsPerPage, paginatedTransactions } =
		useSelector((state) => ({
			transactionsList: state.balance.transactionsList,
			currentPage: state.balance.currentPage,
			itemsPerPage: state.balance.itemsPerPage,
			paginatedTransactions: state.balance.paginatedTransactions,
		}))
	const data = {
		labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
		datasets: [
			{
				label: "# of Votes",
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	}

	const options = {
		responsive: true, // Biểu đồ sẽ tự điều chỉnh kích thước theo màn hình
		cutout: "40%", // Điều chỉnh độ lớn của phần rỗng ở giữa (giá trị % hoặc px)
		plugins: {
			legend: {
				position: "top", // Đặt vị trí của chú giải, có thể là 'top', 'bottom', 'left', 'right'
				labels: {
					color: "#333", // Màu chữ của các nhãn chú giải
					font: {
						size: 14, // Kích thước chữ
					},
				},
			},
			tooltip: {
				enabled: true, // Bật hoặc tắt tooltip khi di chuột qua
				callbacks: {
					label: function (tooltipItem) {
						return `${tooltipItem.label}: ${tooltipItem.raw} votes` // Tùy chỉnh hiển thị tooltip
					},
				},
			},
		},
	}
	return <Doughnut data={data} options={options} />
}
