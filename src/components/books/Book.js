import React from 'react';
import PropTypes from 'prop-types';
import BookAvatar from './BookAvatar';
import BookInfo from './BookInfo';

import './Book.css';
  
const Book = ({ book, children }) => (
  <div className='book'>
    <div className='book-top'>
      {book.imageLinks && book.imageLinks.thumbnail && (
        <BookAvatar
          image={book.imageLinks.thumbnail}
          alt={book.title}
        />
      )}
      {children}
    </div>
    <BookInfo title={book.title} authors={book.authors} />
  </div>
);
Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.shape({
      thumbnail: PropTypes.string.isRequired
    })
  })
}
export default Book;