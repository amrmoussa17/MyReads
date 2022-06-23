import React from "react"
import { Link } from "react-router-dom"
import * as BooksApi from "./BooksAPI"
import SearchResults from "./SearchResults"
import PropTypes from "prop-types"

function Search({ searchResults, setSearchResults }) {
  const [query, setQuery] = React.useState("")
  React.useEffect(() => {
    const search = async () => {
      const res = await BooksApi.search(query, 5)
      setSearchResults(res)
    }
    if (query) {
      search()
    }
  }, [query])

  // handle search when user types on search field
  function handleQuery(e) {
    setQuery(e.target.value)
  }

  function handleChange(e) {
    const { id, value } = e.target
    let updatedBook = {}
    searchResults.forEach((book) => {
      if (book.id === id) {
        return (updatedBook = book)
      }
    })
    updatedBook.shelf = value
    BooksApi.update(updatedBook, 5)
  }

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close search
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={query}
              onChange={handleQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          {query &&
            searchResults !== undefined &&
            searchResults.constructor === Array &&
            searchResults.length !== 0 && (
              <SearchResults
                books={searchResults}
                handleChange={handleChange}
              />
            )}
        </div>
      </div>
    </div>
  )
}
Search.propTypes = {
  books: PropTypes.array,
}
export default Search
