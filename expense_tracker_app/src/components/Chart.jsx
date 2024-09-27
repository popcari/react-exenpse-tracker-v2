// external libraries
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import PropTypes from "prop-types"

// internal libraries
import { CURRENCY } from "../constants/constant"
import { formatNumberWithDots } from "../utils/number"
// Đăng ký các thành phần từ chart.js
ChartJS.register(ArcElement, Tooltip, Legend)

DoughnutChart.propTypes = {
	chartData: PropTypes.object,
	chartTitle: PropTypes.string,
}

export default function DoughnutChart({ chartData, chartTitle }) {
	// same option for every doughnut chart
	const options = {
		responsive: true, // Biểu đồ sẽ tự điều chỉnh kích thước theo màn hình
		cutout: "40%", // Điều chỉnh độ lớn của phần rỗng ở giữa (giá trị % hoặc px)
		plugins: {
			legend: {
				position: "right",
				labels: {
					color: "#333",
					font: {
						size: 12,
					},
				},
			},
			tooltip: {
				enabled: true, // Bật hoặc tắt tooltip khi di chuột qua
				callbacks: {
					label: function (tooltipItem) {
						// Tính phần trăm
						const total = tooltipItem.chart.data.datasets[0].data.reduce(
							(acc, val) => acc + val,
							0,
						)
						const value = tooltipItem.raw
						const percentage = ((value / total) * 100).toFixed(2) // Làm tròn phần trăm đến 2 chữ số thập phân

						// Hiển thị giá trị và phần trăm
						return `${tooltipItem.label}: ${formatNumberWithDots(value)} ${CURRENCY} (${percentage}%)`
					},
				},
				padding: 10,
				titleMarginBottom: 10,
				bodyColor: "#ffffff",
				usePointStyle: true,
				titleAlign: "center",
			},
		},
		interaction: {
			mode: "index",
		},
		pieceLabel: {
			mode: "value",
		},
		animation: {
			animateScale: true,
			animateRotate: true,
		},
	}

	return (
		<div className='flex flex-col items-center w-[300px] tablet:w-[500px]'>
			<p className='text-lg font-semibold italic'>{chartTitle ?? "dcmm"}</p>
			<Doughnut data={chartData} options={options} />
		</div>
	)
}
