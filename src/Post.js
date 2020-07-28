import React, { useState, useEffect } from 'react';
import './Post.css';

import { Input, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import { db } from './fireStore/firebase';
import firebase from 'firebase';

// import Alert from './components/Alert';

const Post = ({ postId, currentUser, userName, imageUrl, caption, logo }) => {
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState('');
  // const [error, setError] = useState('');

  useEffect(() => {
    let unSubscribe;
    if (postId) {
      unSubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unSubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setComment('');
  };

  return (
    <div className='post'>
      {/* header => avatar + username */}
      <div className='post_header'>
        <Avatar className='avatar' alt={userName} src={logo} />
        <h3>{userName}</h3>
      </div>

      {/* image */}
      <div className='img_container'>
        <img src={imageUrl} className='post_image' alt='' />
      </div>

      {/* username + caption */}
      <div className='description'>
        <h4>
          <span>{userName}</span> {caption}
        </h4>
      </div>

      {comments.length > 0 && (
        <div className='comments'>
          {comments.map((comment) => (
            <p>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          ))}
        </div>
      )}

      {currentUser && (
        <form className='post_container'>
          <Input
            type='text'
            name='comment'
            value={comment}
            className='input'
            placeholder='comment here'
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={!comment}
            onClick={postComment}
            className='post_btn'>
            Post
          </Button>
        </form>
      )}

      {/* {error && <Alert message={error} />} */}
    </div>
  );
};

export default Post;
