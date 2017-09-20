import React from 'react';

const BookAvatar = ({ image, alt }) => (
  <div className='book-cover'>
    <img src={image} alt={alt} />
  </div>
);

export default BookAvatar;