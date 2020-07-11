import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDMPUlt4KP5dBa5MUaCIVIkLgtn2Vl6Vds',
  authDomain: 'instagram-clone-app-3e755.firebaseapp.com',
  databaseURL: 'https://instagram-clone-app-3e755.firebaseio.com',
  projectId: 'instagram-clone-app-3e755',
  storageBucket: 'instagram-clone-app-3e755.appspot.com',
  messagingSenderId: '378278911055',
  appId: '1:378278911055:web:b8e2b9926300e9a45bde3a',
  measurementId: 'G-R9SR0M7JPR',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
