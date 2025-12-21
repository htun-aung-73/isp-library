import { NextResponse, type NextRequest } from "next/server"

const SESSION_COOKIE_NAME = "library_session"

export async function proxy(request: NextRequest) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)

    // Protect routes that require authentication
    const protectedPaths = ["/my-books", "/books", "/analytics", "/authors"]
    const adminPaths = ["/admin", "/admin/details/users", "/admin/details/users/[id]"]
    const redirectPaths = ["/admin/details"]
    const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
    const isAdminPath = adminPaths.some((path) => request.nextUrl.pathname.startsWith(path))
    const isRedirectPath = redirectPaths.some((path) => request.nextUrl.pathname.startsWith(path))

    // Redirect to login if accessing protected routes without session
    if ((isProtectedPath || isAdminPath || isRedirectPath) && !sessionCookie?.value) {
        const url = request.nextUrl.clone()
        url.pathname = "/auth/login"
        return NextResponse.redirect(url)
    }

    // Redirect to admin details to users page
    if (request.nextUrl.pathname === "/admin/details" && sessionCookie?.value) {
        const session = JSON.parse(sessionCookie.value)
        if (session.isAdmin) {
            const url = request.nextUrl.clone()
            url.pathname = "/admin/details/users"
            return NextResponse.redirect(url)
        }
    }

    // Check admin access for admin paths
    if (isAdminPath && sessionCookie?.value) {
        try {
            const session = JSON.parse(sessionCookie.value)
            if (!session.isAdmin) {
                const url = request.nextUrl.clone()
                url.pathname = "/"
                return NextResponse.redirect(url)
            }
        } catch {
            // Invalid session, redirect to login
            const url = request.nextUrl.clone()
            url.pathname = "/auth/login"
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}