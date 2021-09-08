import ShopActionTypes from './shop.types';

import {
    firestore, 
    convertCategoriesSnapshotToMap
} from '../../firebase/firebase.utils';

export const fetchCategoriesStart = () => ({
    type: ShopActionTypes.FETCH_CATEGORIES_START
});

export const fetchCategoriesSuccess = (categoriesMap) => ({
    type: ShopActionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: categoriesMap
});

export const fetchCategoriesFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_CATEGORIES_FAILURE,
    payload: errorMessage
});

export const fetchCategoriesStartAsync = () => {
    return dispatch => {
        const categoriesRef = firestore.collection('collections');
        // dispatching the moment this function gets called 
        // dispatches the action for start, switching fetching state to true 
        dispatch(fetchCategoriesStart());
        // async code: getches code from back end 
        categoriesRef
            .get()
            .then(snapshot => {
                // build map
                const categoriesMap = convertCategoriesSnapshotToMap(snapshot);
                // dispatch success the moment this comes in
                dispatch(fetchCategoriesSuccess(categoriesMap));
        })
        .catch(error => dispatch(fetchCategoriesFailure(error.message)));
    };
};



