import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	isFormShow: false,
	modaltitle: "",
	transactionItemData: null,
}

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleModalForm: (state, action) => {
			state.isFormShow = action.payload
		},
		setTransactionItemData: (state, action) => {
			state.transactionItemData = action.payload
		},
		resetTransactionItemData: (state, action) => {
			state.transactionItemData = action.payload
		},
		setModalTitle: (state, action) => {
			state.modalTitle = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const {
	toggleModalForm,
	setTransactionItemData,
	resetTransactionItemData,
	setModalTitle,
} = modalSlice.actions

export default modalSlice.reducer
