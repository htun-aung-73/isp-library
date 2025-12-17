import { redirect } from "next/navigation"
import { getSession } from "@/lib/baserow/auth"
import { getBorrowedBooks } from "@/lib/baserow/client"
import { MyBooksContent } from "@/components/my-books-content"
import { LibraryCard } from "@/components/library-card"

export default async function MyBooksPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login")
  }

  const borrowedBooks = await getBorrowedBooks(session.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Books</h1>
        <p className="text-muted-foreground">Manage your borrowed books and view your library card</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MyBooksContent borrowedBooks={borrowedBooks || []} userId={String(session.id)} />
        </div>
        <div className="lg:col-span-1">
          <LibraryCard
            userEmail={session.email || ""}
            borrowedCount={borrowedBooks?.filter((b) => b.status === "borrowed").length || 0}
            memberSince={new Date().toISOString()}
          />
        </div>
      </div>
    </div>
  )
}

