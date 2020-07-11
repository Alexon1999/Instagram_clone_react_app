import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButtons({ getFileName }) {
  const classes = useStyles();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      getFileName(e.target.files[0]);
    }
  };

  return (
    <div className={classes.root}>
      <input
        accept='image/*'
        className={classes.input}
        id='icon-button-file'
        type='file'
        onChange={handleChange}
      />
      <label htmlFor='icon-button-file'>
        <IconButton
          color='secondary'
          aria-label='upload picture'
          component='span'>
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
}
