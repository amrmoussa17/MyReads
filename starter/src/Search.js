import React from "react";
import { Link } from "react-router-dom";
import * as BooksApi from "./BooksAPI";
import SearchResults from "./SearchResults";
import PropTypes from "prop-types";

function Search({ searchResults, setSearchResults, books }) {
  const [query, setQuery] = React.useState("");
  React.useEffect(() => {
    const search = async () => {
      const res = await BooksApi.search(query, 5);
      if (res !== undefined && res.constructor === Array && res.length !== 0) {
        res.forEach((item) => {
          books.forEach((book) => {
            if (item.id === book.id) {
              return (item.shelf = book.shelf);
            }
          });
        });
        res.forEach((item) => {
          if (item.shelf === undefined) {
            item.shelf = "none";
          }
        });
        setSearchResults(res);
      }
    };
    if (query) {
      search();
    }
  }, [query]);

  // handle search when user types on search field
  function handleQuery(e) {
    setQuery(e.target.value);
  }

  function handleChange(e) {
    const { id, value } = e.target;
    let updatedBook = {};
    searchResults.forEach((book) => {
      if (book.id === id) {
        return (updatedBook = book);
      }
    });
    updatedBook.shelf = value;
    BooksApi.update(updatedBook, value);
    setSearchResults((prevResults) =>
      prevResults.map((result) =>
        result.id === updatedBook.id ? { ...result, shelf: value } : result
      )
    );
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
          {query && (
            <SearchResults books={searchResults} handleChange={handleChange} />
          )}
        </div>
      </div>
    </div>
  );
}
Search.propTypes = {
  books: PropTypes.array,
};
export default Search;
