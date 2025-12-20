// API Types
/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
    success: boolean
    user: T
    error?: string
}

export interface ApiReturnResponse<T> {
    success: boolean
    data: T
    error?: string
}

/**
 * Generic Baserow list response wrapper
 */
export interface BaserowListResponse<T> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}
export interface LinkData {
    id: string,
    order?: string | null,
    value: string | null,
}
/**
 * Author from Baserow (table 772588)
 */
export interface BaserowAuthor {
    id: string,
    order: string,
    author_id: string | null,
    name: string,
    books: LinkData[]
}

/**
 * Publisher from Baserow (table 772593)
 */
export interface BaserowPublisher {
    id: string
    order: string
    publisher_id: string | null,
    name: string,
    books: LinkData[]
}

/**
 * Book from Baserow (table 772570)
 * Field names match actual Baserow table columns
 */
export interface BaserowBook {
    id: string
    order: string
    book_id: string | null
    author_name?: LinkData[] | null
    title: string
    language: string | null
    place_of_publication?: string | null
    publisher_name?: LinkData[] | null
    publisher_id?: LinkData[] | null
    year_of_publication?: number | null
    edition?: string | null  // Note: typo in original field name
    price?: number | null
    class_number?: string | null
    source?: string | null
    notes?: string | null
    lost_damage?: string | null
    note?: string | null
    author?: LinkData[] | null
    publisher?: LinkData[] | null
}

/**
 * User from Baserow (table 772601)
 */
export interface BaserowUser {
    id: string
    order: string
    user_id: string
    username: string
    email: string
    password: string
    is_admin: boolean
    created_at: string
    updated_at?: string
}

/**
 * Borrowed Book from Baserow (table 772607)
 */
export interface BaserowBorrowedBook {
    id: string
    order: string
    borrow_id: string
    book_id?: LinkData[] | null
    book_title?: LinkData[] | null
    user_id?: LinkData[] | null
    username?: LinkData[] | null
    author_id: LinkData[] | null
    author_name: LinkData[] | null
    publisher_id?: LinkData[] | null
    publisher_name?: LinkData[] | null
    borrowed_at: string
    due_date: string
    returned_at: string
    status: "borrowed" | "returned" | "overdue"
}

/**
 * Session user (stored in cookie/localStorage)
 */
export interface SessionUser {
    id: string
    user_id: string
    email: string
    username: string
    isAdmin: boolean
    created_at: string
    updated_at?: string
}

/**
 * Mapped types for frontend consumption
 */
export interface Author {
    id: string
    author_id: string | null
    name: string
    books: LinkData[]
}

export interface Publisher {
    id: string
    publisher_id: string | null
    name: string
    books: LinkData[]
}

export interface Book {
    id: string
    book_id: string | null
    title: string
    author_name: string | null
    language: string | null
    author_id?: string | null
    publisher_name: string | null
    publisher_id?: string | null
    place_of_publication: string | null
    published_year: number | null
    edition: string | null
    price: number | null
    class_number: string | null
    source: string | null
    notes: string | null
    created_at: string
}

export interface BorrowedBook {
    id: string
    borrow_id: string
    book_id: string | null
    title: string | null
    user_id: string | null
    username: string | null
    author_id: string | null
    author_name: string | null
    publisher_id?: string | null
    publisher_name?: string | null
    borrowed_at: string
    due_date: string
    returned_at: string
    status: "borrowed" | "returned" | "overdue"
}

export interface UserProfile {
    id: string
    user_id: string | null
    username: string | null
    email: string | null
    is_admin: boolean
    created_at?: string
    updated_at?: string
}

/**
 * Mapper functions to convert Baserow types to frontend types
 */
export function mapLinkData(linkData: LinkData[] | null | undefined): string | null {
    if (!linkData) return null
    return Array.isArray(linkData) && linkData.length > 0 ? linkData[0].value : null
}

export function mapBaserowAuthorToAuthor(author: BaserowAuthor): Author {
    return {
        id: author.id,
        author_id: author.author_id,
        name: author.name,
        books: author.books,
    }
}

export function mapBaserowBookToBook(book: BaserowBook): Book {
    const authorName = Array.isArray(book.author_name) && book.author_name.length > 0
        ? book.author_name[0].value
        : (typeof book.author_name === 'string' ? book.author_name : null);

    return {
        id: book.id,
        book_id: book.book_id ?? null,
        title: book.title,
        author_name: authorName ?? null,
        author_id: mapLinkData(book.author),
        language: book.language ?? null,
        publisher_name: mapLinkData(book.publisher_name),
        publisher_id: mapLinkData(book.publisher),
        place_of_publication: book.place_of_publication ?? null,
        published_year: book.year_of_publication ?? null,
        edition: book.edition ?? null,
        price: book.price ?? null,
        class_number: book.class_number ?? null,
        source: book.source ?? null,
        notes: book.notes ?? null,
        created_at: new Date().toISOString(),
    }
}

export function mapBaserowUserToSessionUser(user: BaserowUser): SessionUser {
    return {
        id: user.id,
        user_id: user.user_id ?? null,
        username: user.username ?? null,
        email: user.email,
        isAdmin: user.is_admin,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }
}

export function mapBaserowBorrowedBook(borrowed: BaserowBorrowedBook): BorrowedBook {
    return {
        id: borrowed.id,
        borrow_id: borrowed.borrow_id,
        book_id: mapLinkData(borrowed.book_id),
        title: mapLinkData(borrowed.book_title),
        user_id: mapLinkData(borrowed.user_id),
        username: mapLinkData(borrowed.username),
        author_id: mapLinkData(borrowed.author_id),
        author_name: mapLinkData(borrowed.author_name),
        publisher_id: mapLinkData(borrowed.publisher_id),
        publisher_name: mapLinkData(borrowed.publisher_name),
        borrowed_at: borrowed.borrowed_at,
        due_date: borrowed.due_date,
        returned_at: borrowed.returned_at,
        status: borrowed.status,
    }
}
