import { getBooks, getAuthors } from "@/lib/baserow/client"
import { AnalyticsCharts } from "@/components/analytics-charts"

export default async function AnalyticsPage() {
  // Get books from Baserow
  const books = await getBooks()

  // Get authors from Baserow
  const authors = await getAuthors()

  // Process genre data
  const genreCounts: Record<string, number> = {}
  books?.forEach((book) => {
    if (book.genre) {
      genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1
    }
  })
  const genreData = Object.entries(genreCounts).map(([name, value]) => ({
    name,
    value,
  }))

  // Process author data - count books per author
  const authorBookCounts: Record<string, number> = {}
  books?.forEach((book) => {
    if (book.author?.name) {
      authorBookCounts[book.author.name] = (authorBookCounts[book.author.name] || 0) + 1
    }
  })
  const authorData = Object.entries(authorBookCounts).map(([name, books]) => ({
    name,
    books,
  }))

  // Process decade data
  const decadeCounts: Record<string, number> = {}
  books?.forEach((book) => {
    if (book.published_year) {
      const decade = Math.floor(book.published_year / 10) * 10
      const decadeLabel = `${decade}s`
      decadeCounts[decadeLabel] = (decadeCounts[decadeLabel] || 0) + 1
    }
  })
  const decadeData = Object.entries(decadeCounts)
    .map(([decade, count]) => ({ decade, count }))
    .sort((a, b) => a.decade.localeCompare(b.decade))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Library Analytics</h1>
        <p className="text-muted-foreground">Insights into our book collection and authors</p>
      </div>

      <AnalyticsCharts genreData={genreData} authorData={authorData} decadeData={decadeData} />
    </div>
  )
}

