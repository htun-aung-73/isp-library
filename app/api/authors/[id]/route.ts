import { NextResponse } from "next/server"
import { getAuthorById } from "@/lib/baserow/client"
import { mapBaserowAuthorToAuthor } from "@/lib/baserow/types"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    try {
        const author = await getAuthorById(id)

        if (!author) {
            return NextResponse.json({ success: false, error: "Author not found" }, { status: 404 })
        }
        return NextResponse.json({ success: true, data: mapBaserowAuthorToAuthor(author) })
    } catch (error) {
        console.error("Get Author API error:", error)
        return NextResponse.json({ success: false, error: error?.toString() }, { status: 500 })
    }
}
