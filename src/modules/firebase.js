import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAlUe-PGNLtrd7fjVmkZh3Dz8l-bFpycLE",
  authDomain: "stackpile-5c77c.firebaseapp.com",
  projectId: "stackpile-5c77c",
  storageBucket: "stackpile-5c77c.appspot.com",
  messagingSenderId: "729005181613",
  appId: "1:729005181613:web:292c0b95342c0849161424",
  measurementId: "G-SKR7JWLKZG"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app();
}

export default {
  firebase: firebase,
  auth: firebase.auth,
  firestore: firebase.firestore,
  analytics: firebase.analytics,
  storage: firebase.storage
}

// module.exports.auth = firebase.auth();
// module.exports.firestore = firebase.firestore();
// module.exports.analytics = firebase.analytics();