import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	isFormShow: false,
}

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleModalForm: (state, action) => {
			state.isFormShow = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { toggleModalForm } = modalSlice.actions

export default modalSlice.reducer
