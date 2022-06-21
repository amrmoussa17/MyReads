import "./App.css"
import React from "react"
import { Route, Routes } from "react-router-dom"
import Main from "./Main"
import Search from "./Search"

function App() {
  // const [searchInput, setSearchInput] = useState("")
  // const [searchBooks, setSearchBooks] = useState([])

  // // update bookshelf status

  // // handle search when user types on search field
  // function handleSearch(e) {
  //   setSearchInput(e.target.value)
  // }

  // useEffect(() => {
  //   const searchBooks = async () => {
  //     const res = await BooksApi.search(searchInput, 5)
  //     setSearchBooks(res)
  //   }
  //   searchBooks()
  // }, searchInput)

  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  )
}
export default App
