import React from 'react';
import '../style.css';

const Spinner = ({ show }) => (
  <div className={`spinner-overlay${show ? ' spinner-show' : ''}`}>
    <div className="spinner-container">
      <div className="spinner-circle"></div>
      <div className="spinner-text">Loading...</div>
    </div>
  </div>
);

export default Spinner; 