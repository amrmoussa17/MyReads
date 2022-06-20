import "./App.css"
import { useEffect, useState } from "react"
import * as BooksApi from "./BooksAPI"
import BookShelf from "./BookShelf"

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false)
  const [books, setBooks] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksApi.getAll()
      setBooks(res)
    }
    getBooks()
  }, [])

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          {console.log(books)}
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf books={books} shelf="currentlyReading" />
              <BookShelf books={books} shelf="wantToRead" />
              <BookShelf books={books} shelf="read" />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
