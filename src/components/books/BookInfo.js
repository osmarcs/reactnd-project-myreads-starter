import React from 'react';
import PropTypes from 'prop-types';
import './BookInfo.css';

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

BookInfo.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.arrayOf(PropTypes.string)
}
export default BookInfo;