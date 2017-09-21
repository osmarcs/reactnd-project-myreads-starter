import React from 'react';
import { Route } from 'react-router-dom';
import _ from 'lodash';

import HomeScene from './scenes/Home';
import SearchScene from './scenes/Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

const updateShelfOfBook = (book, shelf) => {
  if (book.shelf === shelf) {
    return book;
  }
  const cloneBook = _.cloneDeep(book);
  cloneBook.shelf =  shelf;
  return cloneBook;
}

const updateBooks = (currentBook, books) => {
  return books.map((book) => {
    if (currentBook.id === book.id) {
      return updateShelfOfBook(book, currentBook.shelf);
    }
    return book;
  });
}

const updateBooksShelf = (books, myBooks) => {
  return books.map((book) => {
    const bookIdx = myBooks.findIndex(myBook => book.id === myBook.id);
    if (bookIdx > -1) {
      return updateShelfOfBook(book, myBooks[bookIdx].shelf);
    }
    return book;
  })
};

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    shelfs: {},
    searchBooks: []
  }
  constructor(props) {
    super(props);
    this.searchInput = _.debounce(this.searchInput, 800);
  }
  searchInput(target) {
    const bookSearch = target.value;
    BooksAPI.search(bookSearch)
      .then(books => {
        if (books.error) {
          books = [];
        }
        this.setState((state) => ({
          searchBooks: updateBooksShelf(books, state.myBooks)
        }))
      });
  }
  moveBook(type, book, e) {
    const shelf = e.target.value;
    BooksAPI.update(book, shelf)
      .then((result) => {
        this.updateBooksState(type, book, shelf);
      })
  }
  componentDidMount() {
    this.setState({ shelfs: BooksAPI.shelfs });
    BooksAPI.getAll().then(books => {
      this.setState({ myBooks: books });
    });
  }

  updateBooksState(type, book, shelf) {
    this.setState(({ searchBooks, myBooks }) => {
      const bookUpdated = updateShelfOfBook(book, shelf);
      const currUpdateBooks = (books) => (updateBooks(bookUpdated, books));
      return {
        myBooks: currUpdateBooks(myBooks),
        searchBooks: currUpdateBooks(searchBooks)
      };
    });
  }

  render() {
    const {shelfs, myBooks} = this.state;
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <HomeScene
            shelfs={shelfs}
            books={myBooks}
            moveBook={(book, e) => this.moveBook.bind(this,'myBooks')(book, e)}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchScene
            books={this.state.searchBooks}
            shelfs={shelfs}
            onSearchInput={(e) => this.searchInput(e.target)}
            moveBook={(book, e) => this.moveBook.bind(this,'search')(book, e)}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp;
