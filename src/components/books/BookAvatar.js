import React from 'react';

const BookAvatar = ({ image }) => (
  <div 
    className='book-cover' 
    style={{ 
      width: 128, 
      height: 193, 
      backgroundImage: `url(${image})` 
    }}>
  </div>
);

export default BookAvatar;