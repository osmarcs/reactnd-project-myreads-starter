import React from 'react';
import { Route } from 'react-router-dom';
import _ from 'lodash';

import HomeScene from './scenes/Home';
import SearchScene from './scenes/Search';
import * as BooksAPI from './BooksAPI';
import Loading from './components/loading/Loading';
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

const removeBook = (myBooks, book) => {
  return myBooks.filter(myBook => myBook.id !== book.id);
}

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    shelfs: {},
    searchBooks: [],
    searchQuery: '',
    loading: false,
  }
  constructor(props) {
    super(props);
    this.searchBooks = _.debounce(this.searchBooks.bind(this), 500);
    this.moveBook = this.moveBook.bind(this);
  }
  searchInput(query) {
    this.setState({ searchQuery: query });
    this.searchBooks(query);
  }
  searchBooks(query) {
    if (!query.length) {
      this.setState({ searchBooks: []});
      return;
    }

    this.setState({ loading: true });
    BooksAPI.search(query)
    .then(books => {
      if (books.error) {
        books = [];
      }
      this.setState((state) => ({
        searchBooks: updateBooksShelf(books, state.myBooks),
        loading: false
      }))
    });
  }
  moveBook(book, e) {
    const shelf = e.target.value;
    this.setState({loading: true});
    BooksAPI.update(book, shelf)
      .then((result) => {
        this.updateBooksState(book, shelf);
      })
  }
  componentDidMount() {
    this.setState({ shelfs: BooksAPI.shelfs, loading: true });
    BooksAPI.getAll().then(books => {
      this.setState({ myBooks: books, loading: false });
    });
  }
  updateBooksState(book, shelf) {
    this.setState(({ searchBooks, myBooks }) => {
      if (!book.shelf || book.shelf === 'none') {
        myBooks = [...myBooks, book];
      }
      if (!shelf || shelf === 'none') {
        myBooks = removeBook(myBooks, book);
      }
      const bookUpdated = updateShelfOfBook(book, shelf);
      const currUpdateBooks = (books) => (updateBooks(bookUpdated, books));
      return {
        myBooks: currUpdateBooks(myBooks),
        searchBooks: currUpdateBooks(searchBooks),
        loading: false
      };
    });
  }
  render() {
    const {shelfs, myBooks, loading} = this.state;
    return (
      <div className='app'>
        <Loading active={loading} />
        <Route exact path='/' render={() => (
          <HomeScene
            shelfs={shelfs}
            books={myBooks}
            moveBook={this.moveBook}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchScene
            books={this.state.searchBooks}
            shelfs={shelfs}
            query={this.state.searchQuery}
            onSearchInput={(e) => this.searchInput(e)}
            moveBook={this.moveBook}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp;
