import "./App.css"
import React from "react"
import { Route, Routes } from "react-router-dom"
import Main from "./Main"
import Search from "./Search"

function App() {
  const [books, setBooks] = React.useState([])
  const [searchResults, setSearchResults] = React.useState([])

  React.useEffect(() => {
    if (
      searchResults !== undefined &&
      searchResults.constructor === Array &&
      searchResults.length !== 0
    ) {
      searchResults.forEach((result) => {
        books.forEach((book) => {
          if (result.id === book.id) {
            return setSearchResults((prevResult) =>
              prevResult.map((myBook) =>
                myBook.id === book.id
                  ? { ...myBook, shelf: book.shelf }
                  : { ...myBook, shelf: "None" }
              )
            )
          }
        })
      })
    }
  }, [searchResults])

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Main books={books} setBooks={setBooks} />}
      />
      <Route
        path="/search"
        element={
          <Search
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        }
      />
    </Routes>
  )
}
export default App
