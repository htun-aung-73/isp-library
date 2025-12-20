import { NextResponse } from "next/server"
import { getAuthors } from "@/lib/baserow/client"

export async function GET() {
    try {
        const authors = await getAuthors()
        return NextResponse.json({ success: true, data: authors })
    } catch (error) {
        console.error("API Error:", error)
        return NextResponse.json({ success: false, error: "Failed to fetch authors" }, { status: 500 })
    }
}
