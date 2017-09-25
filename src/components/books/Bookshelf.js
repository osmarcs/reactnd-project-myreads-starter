import React from 'react';
import PropTypes from 'prop-types';

import './Bookshelf.css';

const Bookshelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{ props.name}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.children.map((child, key) => (
          <li key={key}>{child}</li>
        ))}
      </ol>
    </div>
  </div>
);

Bookshelf.propTypes = {
  name: PropTypes.string.isRequired
}

export default Bookshelf;