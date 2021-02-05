import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = process.env.NODE_ENV === 'production' ? {
    apiKey: "AIzaSyDOWenZ-ApGVyLMrMriRl6DguvG5udlhyU",
    authDomain: "tiendas-app20.firebaseapp.com",
    databaseURL: "https://tiendas-app20.firebaseio.com",
    projectId: "tiendas-app20",
    storageBucket: "tiendas-app20.appspot.com",
    messagingSenderId: "1046589679862",
    appId: "1:1046589679862:web:b07379bd6f822963a124d7",
    measurementId: "G-8HZH2KL73Z"
} : {
    apiKey: "AIzaSyBHgyIcKKhla6OVIyux6_Cn5XxLW6t-e3E",
    authDomain: "tiendas-app20dev.firebaseapp.com",
    databaseURL: "https://tiendas-app20dev.firebaseio.com",
    projectId: "tiendas-app20dev",
    storageBucket: "tiendas-app20dev.appspot.com",
    messagingSenderId: "698020383385",
    appId: "1:698020383385:web:8eaa94822357209cb98608",
    measurementId: "G-YPVENQJE8B"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;