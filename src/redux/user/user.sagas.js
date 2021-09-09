import {takeLatest, put, all, call} from 'redux-saga/effects';

import {
    auth, 
    googleProvider, 
    createUserProfileDocument,
    getCurrentUser
} from '../../firebase/firebase.utils';

import UserActionTypes from './user.types';

import {
    signInSuccess, 
    signInFailure
} from './user.actions';

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch(error) {
        yield put(signInFailure(error));
    }
}

// logic from firebase utils and app.js refactored to here
export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(signInFailure(error));
    }
};

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        put(signInFailure(error))
    }
};

export function* isUserAuthenticated() {
    // no promise-based way to get a snapshot of whether user exists or not
    // only way is to make a utility method that will leverage onSnapshotAuthenticated thing from before, but unsubscribes immediately after we get the initial value 
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch(error) {
        yield put(signInFailure(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession)
    ]);
};