import {takeLatest, call, put } from 'redux-saga/effects';

import {
    firestore, 
    convertCategoriesSnapshotToMap
} from '../../firebase/firebase.utils';

import {
    fetchCategoriesSuccess,
    fetchCategoriesFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCategoriesAsync() {
    try {
        const categoriesRef = firestore.collection('collections');
        const snapshot = yield categoriesRef.get();
        const categoriesMap = yield call(convertCategoriesSnapshotToMap, snapshot);
        yield put(fetchCategoriesSuccess(categoriesMap));
    } catch (error) {
        yield put(fetchCategoriesFailure(error.message));
    };
};

export function* fetchCategoriesStart() {
    // pause whenever a specific action comes in
    yield takeLatest(ShopActionTypes.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}