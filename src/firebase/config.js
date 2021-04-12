import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAGuyADn1C8jysjZOAenuJatpcjv62ATXg',
  authDomain: 'vue-share-song.firebaseapp.com',
  projectId: 'vue-share-song',
  storageBucket: 'vue-share-song.appspot.com',
  messagingSenderId: '33235838336',
  appId: '1:33235838336:web:d146d7ebba6114c2e14d65',
};

// Init firebase app
firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };
