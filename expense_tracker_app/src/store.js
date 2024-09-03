import { configureStore } from "@reduxjs/toolkit"

import userSlice from "./features/user/userSlice"
import balanceSlice from "./features/balance/balanceSlice"

export const store = configureStore({
	reducer: {
		user: userSlice,
		balance: balanceSlice,
	},
})
