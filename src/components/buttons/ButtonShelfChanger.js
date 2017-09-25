import React from 'react';
import PropTypes from 'prop-types';
import './ButtonShelfChanger.css';

const ButtonShelfChanger = ({ shelfs, current, onChangeHandler }) => (
  <div className="book-shelf-changer">
    <select defaultValue={current} onChange={onChangeHandler}>
      <option value="" disabled>Move to...</option>
      {
        Object.keys(shelfs).map(shelfKey => (
            <option key={shelfKey} value={shelfKey}>
              {shelfs[shelfKey]}
           </option>
        ))
      }
    </select>
  </div>
);

ButtonShelfChanger.propTypes = {
  shelfs: PropTypes.object.isRequired,
  current: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired
}
export default ButtonShelfChanger;