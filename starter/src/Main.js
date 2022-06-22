import React from "react"
import BookShelf from "./BookShelf"
import { Link } from "react-router-dom"
import * as BooksApi from "./BooksAPI"

function Main() {
  const [books, setBooks] = React.useState([])

  React.useEffect(() => {
    const getBooks = async () => {
      const res = await BooksApi.getAll()
      setBooks(res)
    }
    getBooks()
  }, [])

  function handleChange(e) {
    const { id, value } = e.target
    let updatedBook = {}
    books.forEach((book) => {
      if (book.id === id) {
        return (updatedBook = book)
      }
    })
    BooksApi.update(updatedBook, value)
    setBooks((prevBooks) => {
      return prevBooks.map((book) =>
        book.id === id ? { ...book, shelf: value } : book
      )
    })
  }

  return (
    <div className="list-books">
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BookShelf
                  books={books}
                  shelf="currentlyReading"
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want To Read</h2>
              <div className="bookshelf-books">
                <BookShelf
                  books={books}
                  shelf="wantToRead"
                  handleChange={handleChange}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookShelf
                  books={books}
                  shelf="read"
                  handleChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a Book</Link>
        </div>
      </div>
    </div>
  )
}
export default Main
