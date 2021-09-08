import ShopActionTypes from './shop.types';

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

