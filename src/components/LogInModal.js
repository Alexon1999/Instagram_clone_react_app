import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Input, Button } from '@material-ui/core';

const LogInModal = ({ openLogInModal, logIn }) => {
  const [user, setUser] = useState({
    password: '',
    email: '',
  });

  const { password, email } = user;

  useEffect(() => {
    function closeModal(e) {
      e.target.classList.contains('modal-container') && openLogInModal();
    }

    window.addEventListener('click', closeModal);
    return () => {
      window.removeEventListener('click', closeModal);
    };
  }, [openLogInModal]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    logIn(user);
  };

  return (
    <div className='modal-container'>
      <div className='modal'>
        <FaTimes className='closeModal' onClick={openLogInModal} />
        <form onSubmit={onSubmit}>
          <div className='form-control'>
            <label htmlFor='user name'>Email</label>
            <Input
              type='email'
              name='email'
              className='input'
              placeholder='Enter your user email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='password'>Password</label>
            <Input
              type='password'
              name='password'
              className='input'
              placeholder='Password'
              value={password}
              onChange={onChange}
            />
          </div>
          <Button type='submit' className='signUpBtn'>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogInModal;
