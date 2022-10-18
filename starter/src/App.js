import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Search from "./Search";

function App() {
  const [books, setBooks] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);

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
            books={books}
          />
        }
      />
    </Routes>
  );
}
export default App;
