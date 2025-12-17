module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/baserow/types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Baserow API Types
/**
 * Generic Baserow list response wrapper
 */ __turbopack_context__.s([
    "mapBaserowAuthorToAuthor",
    ()=>mapBaserowAuthorToAuthor,
    "mapBaserowBookToBook",
    ()=>mapBaserowBookToBook,
    "mapBaserowBorrowedBook",
    ()=>mapBaserowBorrowedBook,
    "mapBaserowUserToProfile",
    ()=>mapBaserowUserToProfile
]);
function mapBaserowAuthorToAuthor(author) {
    return {
        id: author.id,
        author_id: author.author_id,
        name: author.name,
        books: author.books
    };
}
function mapBaserowBookToBook(book) {
    const authorName = Array.isArray(book.author_name) && book.author_name.length > 0 ? book.author_name[0].value : typeof book.author_name === 'string' ? book.author_name : null;
    return {
        id: book.id,
        book_id: book.book_id ?? null,
        title: book.title,
        author_name: authorName ?? null,
        language: book.language ?? null,
        publisher_name: Array.isArray(book.publisher_name) && book.publisher_name.length > 0 ? book.publisher_name[0].value : null,
        place_of_publication: book.place_of_publication ?? null,
        published_year: book.year_of_publication ?? null,
        edition: book.edition ?? null,
        price: book.price ?? null,
        class_number: book.class_number ?? null,
        source: book.source ?? null,
        notes: book.notes ?? null,
        created_at: new Date().toISOString()
    };
}
function mapBaserowUserToProfile(user) {
    return {
        id: user.id,
        user_id: user.user_id ?? null,
        username: user.username ?? null,
        email: user.email,
        is_admin: user.is_admin
    };
}
function mapBaserowBorrowedBook(borrowed) {
    return {
        id: borrowed.id,
        borrow_id: borrowed.borrow_id,
        book_id: borrowed.book_id?.[0].value,
        user_id: borrowed.user_id?.[0].value,
        borrowed_at: borrowed.borrowed_at,
        due_date: borrowed.due_date,
        returned_at: borrowed.returned_at ?? null,
        status: borrowed.status
    };
}
}),
"[project]/lib/baserow/client.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Baserow API Client
__turbopack_context__.s([
    "createBorrowRecord",
    ()=>createBorrowRecord,
    "createUser",
    ()=>createUser,
    "getAuthors",
    ()=>getAuthors,
    "getBook",
    ()=>getBook,
    "getBooks",
    ()=>getBooks,
    "getBorrowedBooks",
    ()=>getBorrowedBooks,
    "getUserByEmail",
    ()=>getUserByEmail,
    "getUserById",
    ()=>getUserById,
    "updateBorrowRecord",
    ()=>updateBorrowRecord
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/baserow/types.ts [app-route] (ecmascript)");
;
const BASEROW_API_URL = ("TURBOPACK compile-time value", "https://api.baserow.io") || "https://api.baserow.io";
const BASEROW_API_TOKEN = ("TURBOPACK compile-time value", "4z2b3p6kYWxiDbSdAcKGkb1iQzSo7G5z") || "";
// Table IDs
const TABLE_BOOKS = ("TURBOPACK compile-time value", "772570") || "";
const TABLE_AUTHORS = ("TURBOPACK compile-time value", "772588") || "";
const TABLE_PUBLISHERS = ("TURBOPACK compile-time value", "772593") || "";
const TABLE_USERS = ("TURBOPACK compile-time value", "772601") || "";
const TABLE_BORROW_BOOKS = ("TURBOPACK compile-time value", "772607") || "";
/**
 * Base fetch function for Baserow API
 */ async function baserowFetch(url, options = {}) {
    const httpsUrl = url.replace("http://", "https://");
    const response = await fetch(httpsUrl, {
        ...options,
        headers: {
            "Authorization": `Token ${BASEROW_API_TOKEN}`,
            "Content-Type": "application/json",
            ...options.headers
        }
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Baserow API error: ${response.status} - ${error}`);
    }
    return response.json();
}
/**
 * Fetch all pages from a Baserow list endpoint
 */ async function baserowFetchAll(initialEndpoint) {
    let allResults = [];
    let nextUrl = initialEndpoint;
    // Improve performance by requesting max page size (200) if not specified
    if (!nextUrl.includes("size=")) {
        nextUrl += nextUrl.includes("?") ? "&size=200" : "?size=200";
    }
    while(nextUrl){
        const response = await baserowFetch(nextUrl);
        allResults = [
            ...allResults,
            ...response.results
        ];
        nextUrl = response.next;
    }
    return allResults;
}
async function getBooks() {
    const results = await baserowFetchAll(`${BASEROW_API_URL}/api/database/rows/table/${TABLE_BOOKS}/?user_field_names=true`);
    return results.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapBaserowBookToBook"]);
}
async function getBook(id) {
    try {
        const { results } = await baserowFetch(`${BASEROW_API_URL}/api/database/rows/table/${TABLE_BOOKS}/?user_field_names=true&filter__book_id__equal=${id}`);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapBaserowBookToBook"])(results[0]);
    } catch  {
        return null;
    }
}
async function getAuthors() {
    const results = await baserowFetchAll(`${BASEROW_API_URL}/api/database/rows/table/${TABLE_AUTHORS}/?user_field_names=true`);
    return results;
}
async function getUserByEmail(email) {
    try {
        const response = await baserowFetch(`${BASEROW_API_URL}/api/database/rows/table/${TABLE_USERS}/?user_field_names=true&filter__email__equal=${encodeURIComponent(email)}`);
        return response.results[0] || null;
    } catch  {
        return null;
    }
}
async function getUserById(id) {
    try {
        const user = await baserowFetch(`${BASEROW_API_URL}/api/database/rows/table/${TABLE_USERS}/${id}/?user_field_names=true`);
        return user;
    } catch  {
        return null;
    }
}
async function getBorrowedBooks(userId) {
    try {
        const response = await baserowFetch(`${BASEROW_API_URL}/api/database/rows/table/${TABLE_BORROW_BOOKS}/?user_field_names=true&filter__User__link_row_has=${userId}`);
        return response.results.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapBaserowBorrowedBook"]);
    } catch  {
        return [];
    }
}
async function createBorrowRecord(data) {
    try {
        const response = await baserowFetch(`${BASEROW_API_URL}/api/database/rows/table/${TABLE_BORROW_BOOKS}/?user_field_names=true`, {
            method: "POST",
            body: JSON.stringify({
                book_id: data.bookId,
                user_id: data.userId,
                borrowed_at: new Date().toISOString(),
                due_date: data.dueDate,
                status: "borrowed"
            })
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapBaserowBorrowedBook"])(response);
    } catch  {
        return null;
    }
}
async function updateBorrowRecord(id, data) {
    try {
        const response = await baserowFetch(`${BASEROW_API_URL}/api/database/rows/table/${TABLE_BORROW_BOOKS}/${id}/?user_field_names=true`, {
            method: "PATCH",
            body: JSON.stringify(data)
        });
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapBaserowBorrowedBook"])(response);
    } catch  {
        return null;
    }
}
async function createUser(data) {
    try {
        const response = await baserowFetch(`${BASEROW_API_URL}/api/database/rows/table/${TABLE_USERS}/?user_field_names=true`, {
            method: "POST",
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                username: data.username || null,
                is_admin: false
            })
        });
        return response;
    } catch  {
        return null;
    }
}
}),
"[project]/lib/baserow/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Baserow Authentication Module
__turbopack_context__.s([
    "clearSession",
    ()=>clearSession,
    "getSession",
    ()=>getSession,
    "isAdmin",
    ()=>isAdmin,
    "login",
    ()=>login,
    "refreshSession",
    ()=>refreshSession,
    "setSession",
    ()=>setSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/baserow/client.ts [app-route] (ecmascript)");
;
;
const SESSION_COOKIE_NAME = "library_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days
;
/**
 * Simple password comparison (for demo purposes)
 * In production, use bcrypt or similar
 */ function verifyPassword(inputPassword, storedPassword) {
    // For demo: direct comparison
    // TODO: Replace with proper password hashing (bcrypt)
    return inputPassword === storedPassword;
}
async function login(email, password) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserByEmail"])(email);
        if (!user) {
            return {
                success: false,
                error: "User not found"
            };
        }
        const storedPassword = String(user.password || "");
        if (!verifyPassword(password.trim(), storedPassword.trim())) {
            return {
                success: false,
                error: "Invalid password"
            };
        }
        const sessionUser = {
            id: user.id,
            user_id: user.user_id,
            email: user.email,
            username: user.username,
            isAdmin: user.is_admin || false
        };
        return {
            success: true,
            user: sessionUser
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            error: "An error occurred during login"
        };
    }
}
async function getSession() {
    try {
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
        const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
        if (!sessionCookie?.value) {
            return null;
        }
        const session = JSON.parse(sessionCookie.value);
        return session;
    } catch  {
        return null;
    }
}
async function setSession(user) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(user), {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === "production",
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE,
        path: "/"
    });
}
async function clearSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete(SESSION_COOKIE_NAME);
}
async function isAdmin() {
    const session = await getSession();
    return session?.isAdmin ?? false;
}
async function refreshSession() {
    const currentSession = await getSession();
    if (!currentSession) {
        return null;
    }
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$client$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getUserById"])(currentSession.id);
    if (!user) {
        await clearSession();
        return null;
    }
    const updatedSession = {
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        username: user.username,
        isAdmin: user.is_admin
    };
    await setSession(updatedSession);
    return updatedSession;
}
}),
"[project]/app/api/auth/login/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/baserow/auth.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Email and password are required"
            }, {
                status: 400
            });
        }
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["login"])(email, password);
        if (result.success && result.user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["setSession"])(result.user);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                user: result.user
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: result.error
        }, {
            status: 401
        });
    } catch (error) {
        console.error("Login API error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__05e92a54._.js.map