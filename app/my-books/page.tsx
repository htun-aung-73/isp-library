"use client"

import { MyBooksContent } from "@/components/my-books-content"
import { LibraryCard } from "@/components/library-card"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectUser } from "@/lib/redux/slices/authSlice"
import { useGetBorrowedBooksByUserIdQuery } from "@/lib/redux/services/baserowApi"
import BooksLoading from "../books/loading"

export default function MyBooksPage() {
  const user = useAppSelector(selectUser)

  const { data: borrowedBooks, isLoading, isError } = useGetBorrowedBooksByUserIdQuery(user.user_id, {
    skip: !user.user_id,
  })

  if (isLoading) {
    return <BooksLoading />
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Books</h1>
          <p className="text-muted-foreground">Manage your borrowed books and view your library card</p>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Failed to load books</h2>
          <p className="text-muted-foreground">Something went wrong while fetching your borrowed books. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Books</h1>
        <p className="text-muted-foreground">Manage your borrowed books and view your library card</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MyBooksContent borrowedBooks={borrowedBooks || []} />
        </div>
        <div className="lg:col-span-1">
          <LibraryCard
            userEmail={user.email}
            borrowedCount={borrowedBooks?.filter((b) => b.status === "borrowed").length || 0}
            memberSince={user.created_at}
          />
        </div>
      </div>
    </div>
  )
}

