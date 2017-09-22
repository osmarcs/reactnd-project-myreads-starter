import React, {Component} from 'react';
import Book from './../../components/books/Book';
import ButtonShelfChanger from './../../components/buttons/ButtonShelfChanger';
import Link from './../../components/Link';

class SearchScene extends Component{

  render() {
    const {
      onSearchInput,
      books,
      shelfs,
      moveBook,
      query
    } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text" defaultValue={query}
              placeholder="Search by title or author"
              onInput={(e) => onSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <Book key={book.id} book={book}>
                <ButtonShelfChanger
                  onChangeHandler={(e) => moveBook.bind(this, book)(e)}
                  shelfs={shelfs}
                  current={book.shelf || 'none'}
                />
              </Book>
            ))}
          </ol>
        </div>
      </div>
      )
  }
}

export default SearchScene;