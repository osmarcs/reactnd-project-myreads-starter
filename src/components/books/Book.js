import React from 'react';
import BookAvatar from './BookAvatar';
import BookInfo from './BookInfo';
  
const Book = ({ book, children }) => (
  <div className='book'>
    <div className='book-top'>
      <BookAvatar image={book.imageLinks.thumbnail} />
      {children}
    </div>
    <BookInfo title={book.title} authors={book.authors} />
  </div>
);

export default Book;