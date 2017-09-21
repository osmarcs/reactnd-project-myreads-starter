import React, {Component} from 'react';
import Book from './../../components/books/Book';
import ButtonShelfChanger from './../../components/buttons/ButtonShelfChanger';

class SearchScene extends Component{

  render() {
    const { onSearchInput, books, shelfs, moveBook} = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onInput={onSearchInput}
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