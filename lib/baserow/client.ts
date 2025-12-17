// Baserow API Client

import {
    BaserowListResponse,
    BaserowBook,
    BaserowAuthor,
    BaserowUser,
    BaserowBorrowedBook,
    mapBaserowBookToBook,
    mapBaserowBorrowedBook,
    Book,
    BorrowedBook,
} from "./types"

const BASEROW_API_URL = process.env.NEXT_PUBLIC_BASEROW_API_URL || "https://api.baserow.io"
const BASEROW_API_TOKEN = process.env.NEXT_PUBLIC_BASEROW_API_TOKEN || ""

// Table IDs
const TABLE_BOOKS = process.env.NEXT_PUBLIC_BASEROW_TABLE_BOOKS || ""
const TABLE_AUTHORS = process.env.NEXT_PUBLIC_BASEROW_TABLE_AUTHORS || ""
const TABLE_PUBLISHERS = process.env.NEXT_PUBLIC_BASEROW_TABLE_PUBLISHERS || ""
const TABLE_USERS = process.env.NEXT_PUBLIC_BASEROW_TABLE_USERS || ""
const TABLE_BORROW_BOOKS = process.env.NEXT_PUBLIC_BASEROW_TABLE_BORROW_BOOKS || ""

/**
 * Base fetch function for Baserow API
 */
async function baserowFetch<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {

    const httpsUrl = url.replace("http://", "https://")

    const response = await fetch(httpsUrl, {
        ...options,
        headers: {
            "Authorization": `Token ${BASEROW_API_TOKEN}`,
            "Content-Type": "application/json",
            ...options.headers,
        },
    })

    if (!response.ok) {
        const error = await response.text()
        throw new Error(`Baserow API error: ${response.status} - ${error}`)
    }

    return response.json()
}

/**
 * Fetch all pages from a Baserow list endpoint
 */
async function baserowFetchAll<T>(initialEndpoint: string): Promise<T[]> {
    let allResults: T[] = []
    let nextUrl: string | null = initialEndpoint

    // Improve performance by requesting max page size (200) if not specified
    if (!nextUrl.includes("size=")) {
        nextUrl += nextUrl.includes("?") ? "&size=200" : "?size=200"
    }

    while (nextUrl) {
        const response: BaserowListResponse<T> = await baserowFetch<BaserowListResponse<T>>(nextUrl)
        allResults = [...allResults, ...response.results]
        nextUrl = response.next
    }

    return allResults
}

/**
 * Get all books with author data
 */
export async function getBooks(): Promise<Book[]> {
    const results = await baserowFetchAll<BaserowBook>(
        `${BASEROW_API_URL}/api/database/rows/table/${TABLE_BOOKS}/?user_field_names=true`
    )
    return results.map(mapBaserowBookToBook)
}

/**
 * Get a single book by ID
 */
export async function getBook(id: string): Promise<Book | null> {
    try {
        const { results } = await baserowFetch<BaserowListResponse<BaserowBook>>(
            `${BASEROW_API_URL}/api/database/rows/table/${TABLE_BOOKS}/?user_field_names=true&filter__book_id__equal=${id}`
        )
        return mapBaserowBookToBook(results[0])
    } catch {
        return null
    }
}

/**
 * Get all authors
 */
export async function getAuthors(): Promise<BaserowAuthor[]> {
    const results = await baserowFetchAll<BaserowAuthor>(
        `${BASEROW_API_URL}/api/database/rows/table/${TABLE_AUTHORS}/?user_field_names=true`
    )
    return results
}

/**
 * Get user by email (for login)
 */
export async function getUserByEmail(email: string): Promise<BaserowUser | null> {
    try {
        const response = await baserowFetch<BaserowListResponse<BaserowUser>>(
            `${BASEROW_API_URL}/api/database/rows/table/${TABLE_USERS}/?user_field_names=true&filter__email__equal=${encodeURIComponent(email)}`
        )
        return response.results[0] || null
    } catch {
        return null
    }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<BaserowUser | null> {
    try {
        const user = await baserowFetch<BaserowUser>(
            `${BASEROW_API_URL}/api/database/rows/table/${TABLE_USERS}/${id}/?user_field_names=true`
        )
        return user
    } catch {
        return null
    }
}

/**
 * Get borrowed books for a user
 */
export async function getBorrowedBooks(userId: string): Promise<BorrowedBook[]> {
    try {
        const response = await baserowFetch<BaserowListResponse<BaserowBorrowedBook>>(
            `${BASEROW_API_URL}/api/database/rows/table/${TABLE_BORROW_BOOKS}/?user_field_names=true&filter__user_id__link_row_contains=${userId}`
        )
        return response.results.map(mapBaserowBorrowedBook)
    } catch {
        return []
    }
}

/**
 * Create a borrow record
 */
export async function createBorrowRecord(data: {
    bookId: string
    userId: string
    dueDate: string
}): Promise<BorrowedBook | null> {
    try {
        const response = await baserowFetch<BaserowBorrowedBook>(
            `${BASEROW_API_URL}/api/database/rows/table/${TABLE_BORROW_BOOKS}/?user_field_names=true`,
            {
                method: "POST",
                body: JSON.stringify({
                    book_id: data.bookId,
                    user_id: data.userId,
                    borrowed_at: new Date().toISOString(),
                    due_date: data.dueDate,
                    status: "borrowed",
                }),
            }
        )
        return mapBaserowBorrowedBook(response)
    } catch {
        return null
    }
}

/**
 * Update a borrow record (e.g., mark as returned)
 */
export async function updateBorrowRecord(
    id: string,
    data: Partial<{
        returned_at: string
        status: "borrowed" | "returned" | "overdue"
    }>
): Promise<BorrowedBook | null> {
    try {
        const response = await baserowFetch<BaserowBorrowedBook>(
            `${BASEROW_API_URL}/api/database/rows/table/${TABLE_BORROW_BOOKS}/${id}/?user_field_names=true`,
            {
                method: "PATCH",
                body: JSON.stringify(data),
            }
        )
        return mapBaserowBorrowedBook(response)
    } catch {
        return null
    }
}

/**
 * Create a new user (for sign-up)
 */
export async function createUser(data: {
    email: string
    password: string
    username?: string
}): Promise<BaserowUser | null> {
    try {
        const response = await baserowFetch<BaserowUser>(
            `${BASEROW_API_URL}/api/database/rows/table/${TABLE_USERS}/?user_field_names=true`,
            {
                method: "POST",
                body: JSON.stringify({
                    email: data.email,
                    password: data.password, // Should be hashed before sending
                    username: data.username || null,
                    is_admin: false,
                }),
            }
        )
        return response
    } catch {
        return null
    }
}

