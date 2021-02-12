import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey:             process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain:         process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL:        process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId:          process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket:      process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId:  process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId:              process.env.REACT_APP_FIREBASE_APPID,
    measurementId:      process.env.REACT_APP_FIREBASE_MEASUREMENTID
};

const app = firebase.initializeApp(firebaseConfig);

export const timestamp = firebase.firestore.Timestamp;
export const auth = app.auth();
export const storage = app.storage();

export default app.firestore();