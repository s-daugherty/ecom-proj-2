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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    // want to create document if user does not already exist
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // create new document w these properties
        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
} 

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;