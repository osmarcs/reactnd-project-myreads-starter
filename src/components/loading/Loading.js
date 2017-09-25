import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

const Loading = ({ active }) => {
  const classActived = active ? 'load-active' : 'load-deactive';
  return (
    <div className={`loading ${classActived}`}>Loading...</div>
  )
};
Loading.propTypes = {
  active: PropTypes.bool.isRequired
}
export default Loading;