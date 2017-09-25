import React from 'react';
import PropTypes from 'prop-types';
import './BookAvatar.css';

const BookAvatar = ({ image, alt }) => (
  <div className='book-cover'>
    <img src={image} alt={alt} />
  </div>
);

BookAvatar.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string
}

export default BookAvatar;