import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAD7KIko21BfGtjE4VZVdYh-UHu-_LW54c",
    authDomain: "ecom-proj-db.firebaseapp.com",
    projectId: "ecom-proj-db",
    storageBucket: "ecom-proj-db.appspot.com",
    messagingSenderId: "592429805234",
    appId: "1:592429805234:web:9996c55c49c6af46a823ab",
    measurementId: "G-SYRJCD14JF"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;