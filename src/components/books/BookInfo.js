import React from 'react';

const BookInfo = ({ title, authors }) => (
  <div className='book-info'>
    <div className='book-title'>{title}</div>
    <div className='book-authors'>
      {authors && authors.length && (
        authors.map(author => (
          <span key={author}>{author}<br/></span>
          )
        )
      )}
    </div>
  </div>
);

export default BookInfo;