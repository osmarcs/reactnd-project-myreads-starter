import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './../../components/books/Book';
import ButtonShelfChanger from './../../components/buttons/ButtonShelfChanger';
import Link from './../../components/Link';
import './search.css';

class SearchScene extends Component{
  static propTypes = {
    shelfs: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    onSearchInput: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
  }

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
              <li key={book.id}>
                <Book book={book}>
                  <ButtonShelfChanger
                    onChangeHandler={(e) => moveBook.bind(this, book)(e)}
                    shelfs={shelfs}
                    current={book.shelf || 'none'}
                  />
                </Book>
              </li>
            ))}
          </ol>
        </div>
      </div>
      )
  }
}

export default SearchScene;