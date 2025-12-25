"use client"

import { useRef, useEffect } from "react"
import { Provider } from "react-redux"
import { setupListeners } from "@reduxjs/toolkit/query"
import { makeStore, AppStore } from "./store"
import { setCredentials } from "./slices/authSlice"
import { SessionUser } from "../baserow/types"

export default function ReduxProvider({
    children,
    user,
}: {
    children: React.ReactNode
    user: SessionUser | null
}) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        storeRef.current = makeStore()
        if (user) {
            storeRef.current.dispatch(setCredentials({ user }))
        }
    }

    useEffect(() => {
        if (storeRef.current) {
            return setupListeners(storeRef.current.dispatch)
        }
    }, [])

    return <Provider store={storeRef.current}>{children}</Provider>
}
