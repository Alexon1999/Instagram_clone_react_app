import React from 'react';
import '../Alert.css';

const Alert = ({ message }) => {
  return (
    <div className='alert_container'>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
