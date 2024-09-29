import { createSlice } from "@reduxjs/toolkit"
import { LOCALDATA } from "../../utils/localstorage"

const initialState = {
	user: LOCALDATA("user"),
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer
