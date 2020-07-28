import React from 'react';
import { FaUnlock, FaUser, FaSignOutAlt } from 'react-icons/fa';

import { auth } from '../fireStore/firebase';

const Navbar = ({ openSignUpModal, openLogInModal, user }) => {
  return (
    <>
      <div className='app_header'>
        <div className='header_content'>
          <img
            className='app_headerImage'
            src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
            alt=''
          />
          {user ? (
            <FaSignOutAlt
              onClick={() => auth.signOut()}
              cursor='pointer'
              fontSize='1.2rem'
              color='#D556A1'
            />
          ) : (
            <div className='signInOut'>
              <FaUnlock
                cursor='pointer'
                fontSize='1.2rem'
                onClick={openLogInModal}
              />
              <FaUser
                cursor='pointer'
                fontSize='1.2rem'
                onClick={openSignUpModal}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
