import "./App.css"
import React from "react"
import { Route, Routes } from "react-router-dom"
import Main from "./Main"
import Search from "./Search"

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  )
}
export default App
