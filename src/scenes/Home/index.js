import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from './../../components/Link';
import Bookshelf from './../../components/books/Bookshelf';
import Book from './../../components/books/Book';
import ButtonShelfChanger from './../../components/buttons/ButtonShelfChanger';
import './home.css';

class HomeScene extends Component{
  static propTypes = {
    shelfs: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  }
  render() {
    const {shelfs, books, moveBook} = this.props;

    const shelfKeys = Object.keys(shelfs).filter(shelf => shelf.toLowerCase() !== 'none'); 

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            {shelfKeys.map(shelfKey => (
              <Bookshelf key={shelfKey} name={shelfs[shelfKey]}>
                {books
                  .filter(book => book.shelf === shelfKey)
                  .map(book => (
                    <Book key={book.id} book={book}>
                      <ButtonShelfChanger
                        onChangeHandler={(e) => moveBook.bind(this, book)(e)}
                        shelfs={shelfs}
                        current={shelfKey}
                      />
                    </Book>
                  ))
                }
              </Bookshelf>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}
export default HomeScene;
