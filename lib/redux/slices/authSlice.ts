import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SessionUser } from "../../baserow/types"

interface AuthState {
    user: SessionUser
    isAuthenticated: boolean
}

const initialState: AuthState = {
    user: {
        id: "",
        user_id: "",
        email: "",
        username: "",
        isAdmin: false,
    },
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: SessionUser }>
        ) => {
            state.user = action.payload.user
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = {
                id: "",
                user_id: "",
                email: "",
                username: "",
                isAdmin: false,
            }
            state.isAuthenticated = false
        },
    },
    selectors: {
        selectUser: (state) => state.user,
        selectIsAuthenticated: (state) => state.isAuthenticated,
    },
})

export const { setCredentials, logout } = authSlice.actions
export const { selectUser, selectIsAuthenticated } = authSlice.selectors
export default authSlice.reducer
