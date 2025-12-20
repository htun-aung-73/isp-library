// Baserow Authentication Module

import { cookies } from "next/headers"
import { SessionUser } from "./types"
import { getUserByEmail, getUserById } from "./client"
import * as bcrypt from "bcryptjs";

const SESSION_COOKIE_NAME = "library_session"
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

/**
 * Simple password comparison (for demo purposes)
 * In production, use bcrypt or similar
 */
async function verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, storedPassword)
}

/**
 * Login user with email and password
 */
export async function login(
    email: string,
    password: string
): Promise<{ success: boolean; user?: SessionUser; error?: string }> {
    try {
        const user = await getUserByEmail(email)

        if (!user) {
            return { success: false, error: "User not found" }
        }

        const storedPassword = user.password || ""
        if (!await verifyPassword(password.trim(), storedPassword.trim())) {
            return { success: false, error: "Invalid password" }
        }

        const sessionUser: SessionUser = {
            id: user.id,
            user_id: user.user_id,
            email: user.email,
            username: user.username,
            isAdmin: user.is_admin || false,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }
        return { success: true, user: sessionUser }
    } catch (error) {
        console.error("Login error:", error)
        return { success: false, error: "An error occurred during login" }
    }
}

/**
 * Get current session from cookies (server-side)
 */
export async function getSession(): Promise<SessionUser | null> {
    try {
        const cookieStore = await cookies()
        const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

        if (!sessionCookie?.value) {
            return null
        }

        const session = JSON.parse(sessionCookie.value) as SessionUser
        return session
    } catch {
        return null
    }
}

/**
 * Set session cookie (server-side)
 */
export async function setSession(user: SessionUser): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE,
        path: "/",
    })
}

/**
 * Clear session cookie (server-side)
 */
export async function clearSession(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE_NAME)
}

/**
 * Check if current user is admin (server-side)
 */
export async function isAdmin(): Promise<boolean> {
    const session = await getSession()
    return session?.isAdmin ?? false
}

/**
 * Refresh session with latest user data from Baserow
 */
export async function refreshSession(): Promise<SessionUser | null> {
    const currentSession = await getSession()

    if (!currentSession) {
        return null
    }

    const user = await getUserById(currentSession.id)

    if (!user) {
        await clearSession()
        return null
    }

    const updatedSession: SessionUser = {
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        isAdmin: user.is_admin,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }

    await setSession(updatedSession)
    return updatedSession
}

