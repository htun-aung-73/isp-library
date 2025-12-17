(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/baserow/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/baserow/types.ts [app-client] (ecmascript)");
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
    return results.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBaserowBookToBook"]);
}
async function getBook(id) {
    try {
        const { results } = await baserowFetch(`${BASEROW_API_URL}/api/database/rows/table/${TABLE_BOOKS}/?user_field_names=true&filter__book_id__equal=${id}`);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBaserowBookToBook"])(results[0]);
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
        const response = await baserowFetch(`${BASEROW_API_URL}/api/database/rows/table/${TABLE_BORROW_BOOKS}/?user_field_names=true&filter__user_id__link_row_contains=${userId}`);
        return response.results.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBaserowBorrowedBook"]);
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBaserowBorrowedBook"])(response);
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
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$baserow$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapBaserowBorrowedBook"])(response);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lib_baserow_client_ts_6abf3501._.js.map