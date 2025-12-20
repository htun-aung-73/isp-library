"use client"
import Link from "next/link"
import { BookOpen, Search, BarChart3, Library, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SignOutButton } from "@/components/signout-button"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectUser } from "@/lib/redux/slices/authSlice"

export function Header() {
  const user = useAppSelector(selectUser)
  const isAdmin = user?.isAdmin ?? false

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Library className="h-6 w-6 text-pink-600" />
          <span className="text-xl font-semibold text-pink-700">ISP Library</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/books"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Search className="h-4 w-4" />
            Browse Books
          </Link>
          <Link
            href="/authors"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Users className="h-4 w-4" />
            Authors
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <BarChart3 className="h-4 w-4" />
            Analytics
          </Link>
          {user.user_id && !isAdmin && (
            <Link
              href="/my-books"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              My Books
            </Link>
          )}
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user.user_id ? (
            <SignOutButton />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}