import { configureStore } from "@reduxjs/toolkit"

import userSlice from "./features/user/userSlice"
import balanceSlice from "./features/balance/balanceSlice"
import modalSlice from "./features/modal/modalSlice"

export const store = configureStore({
	reducer: {
		user: userSlice,
		balance: balanceSlice,
		modal: modalSlice,
	},
})
