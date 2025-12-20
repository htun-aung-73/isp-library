import { NextResponse } from "next/server"
import { getBooksByAuthorId } from "@/lib/baserow/client"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = (await params)

    try {
        const books = await getBooksByAuthorId(id)
        return NextResponse.json(books)
    } catch (error) {
        console.error("Get Author Books API error:", error)
        return NextResponse.json({ error: error?.toString() }, { status: 500 })
    }
}
