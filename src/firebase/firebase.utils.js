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
};

export const addCollectionAndDocuments = async (
    collectionKey, 
    objectsToAdd
) => {
    // create collection using collection key
    const collectionRef = firestore.collection(collectionKey);

    // batch write so if anything fails to upload, the whole thing fails
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        // give me new doc ref objects and make own key 
        // if you pass something in, that becomes the id
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    // fire off batch call, which returns promise: 
    //  resolves to null if succeeds 
    return await batch.commit();
};

export const convertCategoriesSnapshotToMap = (categories) => {
    const transformedCategories = categories.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });
    // sets properties like hats property = hats collection 
    //  til we have an object where the titles of all collection objects are the keys 
    return transformedCategories.reduce((accumulator, category) => {
        accumulator[category.title.toLowerCase()] = category;
        return accumulator;
    }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;