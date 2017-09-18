import React from 'react';
import { Route } from 'react-router-dom';
import HomeScene from './scenes/Home';
import SearchScene from './scenes/Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    shelfs: {}
  }
  componentDidMount() {
    this.setState({ shelfs: BooksAPI.shelfs });
    BooksAPI.getAll().then(books => { 
      this.setState({ myBooks: books });
      console.log(books);
    });
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <HomeScene books={this.state.books} />
        )} />
        <Route path='/search' component={SearchScene} />
      </div>
    )
  }
}

export default BooksApp
