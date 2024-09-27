import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { LOCALDATA } from "../../utils/localstorage"
import { CATEGORY } from "../../constants/constant"

// Async thunk to fetch transactions
export const fetchTransactions = createAsyncThunk(
	"balance/fetchTransactions",
	async () => {
		try {
			const response = JSON.parse(LOCALDATA("transactions") || "[]")

			return response // This will be the payload of the fulfilled action
		} catch (error) {
			throw new Error("Failed to fetch transactions: ", error)
		}
	},
)

// Async thunk to add a transaction
export const addTransaction = createAsyncThunk(
	"balance/addTransaction",
	async (transaction) => {
		try {
			const currentTransactions = JSON.parse(LOCALDATA("transactions") || "[]")
			const updatedTransactions = [...currentTransactions, transaction]
			LOCALDATA("transactions", JSON.stringify(updatedTransactions))
			return transaction // Return the new transaction only
		} catch (error) {
			throw new Error("Failed to add transaction", error)
		}
	},
)

export const editTransaction = createAsyncThunk(
	"balance/editTransaction",
	async (transaction) => {
		try {
			const currentTransactions = JSON.parse(LOCALDATA("transactions") || "[]")
			const transctionId = transaction._id

			// replace existing transaction with edited transaction
			const newTransactionsList = currentTransactions.map((item) =>
				item._id !== transctionId ? item : transaction,
			)

			LOCALDATA("transactions", JSON.stringify(newTransactionsList))
		} catch (error) {
			throw new Error("Failed to edit transaction", error)
		}
	},
)

export const deleteTransaction = createAsyncThunk(
	"balance/deleteTransaction",
	async (transaction) => {
		try {
			const currentTransactions = JSON.parse(LOCALDATA("transactions") || "[]")
			const transctionId = transaction._id

			// replace existing transaction with edited transaction
			const existingTransactions = currentTransactions.find(
				(item) => item._id === transctionId,
			)

			// remove existing transaction
			const index = currentTransactions.indexOf(existingTransactions)
			if (index > -1) {
				currentTransactions.splice(index, 1)
				LOCALDATA("transactions", JSON.stringify(currentTransactions))
			}
		} catch (error) {
			throw new Error("Failed to edit transaction", error)
		}
	},
)

const initialState = {
	totalBalance: 0,
	income: 0,
	outcome: 0,
	transactionsList: [],
	paginatedTransactions: [],
	currentPage: 1,
	itemsPerPage: 10, // Items per page for pagination
	error: null, // to track any errors
	filteredTransactions: [],
	filterIncome: 0,
	filterOutcome: 0,
}

export const balanceSlice = createSlice({
	name: "balance",
	initialState,
	reducers: {
		calculateBalances: (state) => {
			state.transactionsList.forEach((transaction) => {
				if (transaction.type === "income") {
					state.income += Number(transaction.amount)
				} else if (transaction.type === "outcome") {
					state.outcome += Number(transaction.amount)
				}
			})

			state.totalBalance = state.income - state.outcome
		},

		/**
		 * sort DESC/ASC order
		 * @param {Object} state balance slice's states
		 * @param {String} action sort type
		 */
		sortTransactions: (state, action) => {
			const sortBy = action.payload

			// sort paginated list
			state.paginatedTransactions.sort((a, b) => {
				const dateA = a.created_at.split("-").reverse().join("-")
				const dateB = b.created_at.split("-").reverse().join("-")

				if (sortBy === "latest") {
					return new Date(dateB) - new Date(dateA) // Latest first
				} else if (sortBy === "oldest") {
					return new Date(dateA) - new Date(dateB) // Oldest first
				}
				return 0 // Default case
			})
		},

		/**
		 * Change the new page
		 * @param {Object} state balance slice's states
		 * @param {Number} action sort type
		 */
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload
			// Recalculate paginated transactions whenever the page changes
			const indexOfLastItem = state.currentPage * state.itemsPerPage
			const indexOfFirstItem = indexOfLastItem - state.itemsPerPage

			state.paginatedTransactions = state.transactionsList.slice(
				indexOfFirstItem,
				indexOfLastItem,
			)
		},

		/**
		 * Change item per page (use later)
		 * @param {*} state balance slice's states
		 * @param {*} action
		 */
		setItemsPerPage: (state, action) => {
			state.itemsPerPage = action.payload
			// Reset pagination when items per page changes
			state.currentPage = 1
			const indexOfLastItem = state.currentPage * state.itemsPerPage
			const indexOfFirstItem = indexOfLastItem - state.itemsPerPage

			state.paginatedTransactions = state.transactionsList.slice(
				indexOfFirstItem,
				indexOfLastItem,
			)
		},

		setFilteredTransactions: (state, action) => {
			state.filterIncome = 0
			state.filterOutcome = 0

			const filtered = state.transactionsList.filter((transaction) =>
				transaction.created_at.includes(action.payload),
			)

			state.filteredTransactions = filtered

			state.filteredTransactions.forEach((transaction) => {
				if (transaction.type === "income") {
					state.filterIncome += Number(transaction.amount)
				} else if (transaction.type === "outcome") {
					state.filterOutcome += Number(transaction.amount)
				}
			})
		},
	},
	extraReducers: (builder) => {
		builder
			// ----- fetch transactions cases -----
			.addCase(fetchTransactions.pending, () => {})
			.addCase(fetchTransactions.fulfilled, (state, action) => {
				state.transactionsList = action.payload.map((transaction) => {
					// Find matching category for logo
					const category = CATEGORY.find(
						(cat) => cat.name === transaction.category,
					)
					return {
						...transaction,
						logo: category ? category.logo : "/img/category/unknown.png",
					}
				})

				// Sort transactions by the created_at field (assuming it's in "dd-mm-yyyy" format)
				state.transactionsList.sort((a, b) => {
					const dateA = a.created_at.split("-").reverse().join("-")
					const dateB = b.created_at.split("-").reverse().join("-")
					return new Date(dateB) - new Date(dateA) // Sorting in descending order (latest first)
				})

				// Reset income, outcome, and totalBalance
				state.income = 0
				state.outcome = 0
				state.totalBalance = 0

				// Recalculate income and outcome
				state.transactionsList.forEach((transaction) => {
					if (transaction.type === "income") {
						state.income += Number(transaction.amount)
					} else if (transaction.type === "outcome") {
						state.outcome += Number(transaction.amount)
					}
				})

				// Calculate totalBalance directly from income and outcome
				state.totalBalance = state.income - state.outcome

				// Calculate initial paginated transactions
				const indexOfLastItem = state.currentPage * state.itemsPerPage
				const indexOfFirstItem = indexOfLastItem - state.itemsPerPage
				state.paginatedTransactions = state.transactionsList.slice(
					indexOfFirstItem,
					indexOfLastItem,
				)
			})
			.addCase(fetchTransactions.rejected, (state, action) => {
				state.error = action.error.message
			})

			// ----- add transaction cases -----
			.addCase(addTransaction.fulfilled, (state, action) => {
				const newTransaction = action.payload
				const category = CATEGORY.find(
					(cat) => cat.name === newTransaction.category,
				)

				// Add the new transaction to the list with the logo
				state.transactionsList.push({
					...newTransaction,
					logo: category ? category.logo : "/img/category/unknown.png",
				})

				// Update income, outcome, and totalBalance incrementally
				if (newTransaction.type === "income") {
					state.income += Number(newTransaction.amount)
					state.totalBalance += Number(newTransaction.amount)
				} else if (newTransaction.type === "outcome") {
					state.outcome += Number(newTransaction.amount)
					state.totalBalance -= Number(newTransaction.amount)
				}
			})
	},
})
// Action creators are generated for each case reducer function
export const {
	calculateBalances,
	setCurrentPage,
	setItemsPerPage,
	editTransactionItem,
	sortTransactions,
	setFilteredTransactions,
} = balanceSlice.actions

export default balanceSlice.reducer
