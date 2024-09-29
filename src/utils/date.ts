/**
 *
 * @param dateString (transaction date)
 * @returns formatted date: month/day/year
 */
function formatDate(dateString: Date): string {
	const date = new Date(dateString)
	const result = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`

	return result
}

export { formatDate }
