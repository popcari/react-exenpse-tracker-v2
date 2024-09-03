function formatNumberWithDots(number) {
	if (typeof number !== "number" || isNaN(number)) {
		return "0" // or another default value like "N/A"
	}

	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export { formatNumberWithDots }
