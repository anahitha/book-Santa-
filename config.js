import firebase from 'firebase';
require ('@firebase/firestore')
const firebaseConfig = {
    apiKey: "AIzaSyBPv1XGpYkRenPa8RtzpwpihadBcTTzTv4",
    authDomain: "booksanta-c1100.firebaseapp.com",
    databaseURL: "https://booksanta-c1100.firebaseio.com",
    projectId: "booksanta-c1100",
    storageBucket: "booksanta-c1100.appspot.com",
    messagingSenderId: "967662195974",
    appId: "1:967662195974:web:95b4e097a5a0054c9e3a87"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()