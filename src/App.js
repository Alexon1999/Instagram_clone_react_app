import React, { useState, useEffect } from 'react';
import './App.css';
import IconButton from '@material-ui/core/IconButton';
// +React Icons with font awesome
import { FaPlus } from 'react-icons/fa';
import InstagramEmbed from 'react-instagram-embed';

import Post from './Post';
import Navbar from './components/Navbar';
import SignUpModal from './components/SignUpModal';
import LogInModal from './components/LogInModal';
import ImageUpload from './components/ImageUpload';
import Alert from './components/Alert';

import { db, auth } from './fireStore/firebase';

function App() {
  const [posts, setPosts] = useState([
    // {
    //   userName: 'Alexon',
    //   caption: 'my new car',
    //   logo:
    //     'https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png',
    //   imageUrl:
    //     'https://images.unsplash.com/photo-1594095423783-20ddef768818?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
    // },
  ]);

  const [signUpmodal, setSignUpModal] = useState(false);
  const [logInModal, setLogInModal] = useState(false);
  const [newPost, setNewPost] = useState(false);

  // const userName = useRef('');

  // + Keep track of user
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //+  user logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser(null);
      }

      return () => {
        unSubscribe();
      };
    });
  }, [user]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        // evry time change happenned on posts collections
        // give an array with all documents data
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  const openSignUpModal = () => {
    setSignUpModal((prevModal) => !prevModal);
  };
  const openLogInModal = () => {
    setLogInModal((prevModal) => !prevModal);
  };

  const signUp = ({ username, password, email }) => {
    // userName.current = username;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        });

        setUser(authUser.user);
      })
      .catch((err) => alert(err.message));

    setSignUpModal(false);
  };

  const logIn = ({ email, password }) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));

    setLogInModal(false);
  };

  return (
    <>
      <div className='app'>
        <Navbar
          user={user}
          openLogInModal={openLogInModal}
          openSignUpModal={openSignUpModal}
        />

        {signUpmodal && (
          <SignUpModal openSignUpModal={openSignUpModal} signUp={signUp} />
        )}
        {logInModal && (
          <LogInModal openLogInModal={openLogInModal} logIn={logIn} />
        )}

        <div className='container'>
          <div className='add_new_post'>
            <IconButton onClick={() => setNewPost(!newPost)}>
              <FaPlus cursor='pointer' color='#D556A1' fontSize='2rem' />
            </IconButton>
            <small>add new post</small>
          </div>

          <div className='instagram_contents'>
            <div className='posts'>
              {posts.map(({ post, id }) => (
                <>
                  <Post
                    key={id}
                    postId={id}
                    currentUser={user}
                    userName={post.username}
                    caption={post.caption}
                    logo={post.logo}
                    imageUrl={post.imageUrl}
                  />
                </>
              ))}
            </div>

            <div className='abonnement'>
              <InstagramEmbed
                url='https://instagr.am/p/Zw9o4/'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
              />
            </div>
          </div>
        </div>
      </div>

      {newPost &&
        (user?.displayName ? (
          <ImageUpload
            username={user.displayName}
            close={() => setNewPost(false)}
          />
        ) : (
          <Alert message='You have to login to upload' />
        ))}
    </>
  );
}

export default App;
