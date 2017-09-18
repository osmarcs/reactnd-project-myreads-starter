import React from 'react';
import { Route } from 'react-router-dom';
import HomeScene from './scenes/Home';
import SearchScene from './scenes/Search';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  render() {
    return (
      <div className='app'>
        <Route exact path='/' component={HomeScene} />
        <Route path='/search' component={SearchScene} />
      </div>
    )
  }
}

export default BooksApp
