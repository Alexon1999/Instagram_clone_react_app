import React, { useState } from 'react';
import { Input, Button } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../ImageUpload.css';

import UploadButtons from './UploadButton';

import firebase from 'firebase';
import { storage, db } from '../fireStore/firebase';

const ImageUpload = ({ username, close }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //+ progress bar function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(progress);
      },
      (err) => {
        // error function
        console.log(err);
        alert(err.message);
      },
      () => {
        // complete function
        // it give as an URL
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption,
              imageUrl: url,
              username,
            });

            setProgress(0);
            setCaption('');
            setImage(null);
            close();
          });
      }
    );
  };

  return (
    <div className='upload_container'>
      <div style={{ width: '80%' }}>
        <LinearProgress variant='determinate' value={progress} />
      </div>

      <div className='upload-content'>
        <Input
          type='text'
          name='caption'
          className='input'
          placeholder='Enter a caption'
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <UploadButtons getFileName={setImage} />
        {/* <UploadButtons getFileName={(fileName) => setImage(fileName)} /> */}

        <Button variant='contained' color='secondary' onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
