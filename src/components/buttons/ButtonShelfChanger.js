import React from 'react';

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

export default ButtonShelfChanger;