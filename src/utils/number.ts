/**
 * Format the number with dots separated
 * @param {Number} number: Number need formatting
 * @returns formatted string number x.xxx.xxx.xxx
 */
function formatNumberWithDots(number: number) {
	if (typeof number !== "number" || isNaN(number)) {
		return "0" // or another default value like "N/A"
	}

	const result = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
	return result
}

export { formatNumberWithDots }
