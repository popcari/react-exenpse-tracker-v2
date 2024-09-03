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

const initialState = {
	totalBalance: 0,
	income: 0,
	outcome: 0,
	transactionsList: [],
	error: null, // to track any errors
}

export const balanceSlice = createSlice({
	name: "balance",
	initialState,
	reducers: {
		calculateBalances: (state) => {
			state.transactionsList.forEach((transaction) => {
				if (transaction.type === "income") {
					state.income += transaction.amount
				} else if (transaction.type === "outcome") {
					state.outcome += transaction.amount
				}
			})

			state.totalBalance = state.income - state.outcome
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
				// Reset income, outcome, and totalBalance
				state.income = 0
				state.outcome = 0
				state.totalBalance = 0

				// Recalculate income and outcome
				state.transactionsList.forEach((transaction) => {
					if (transaction.type === "income") {
						state.income += transaction.amount
					} else if (transaction.type === "outcome") {
						state.outcome += transaction.amount
					}
				})

				// Calculate totalBalance directly from income and outcome
				state.totalBalance = state.income - state.outcome
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
					state.income += newTransaction.amount
					state.totalBalance += newTransaction.amount
				} else if (newTransaction.type === "outcome") {
					state.outcome += newTransaction.amount
					state.totalBalance -= newTransaction.amount
				}
			})
	},
})
// Action creators are generated for each case reducer function
export const { calculateBalances } = balanceSlice.actions

export default balanceSlice.reducer
