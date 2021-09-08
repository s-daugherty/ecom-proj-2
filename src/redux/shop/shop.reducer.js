import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    categories: null,
    isFetching: false,
    errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.FETCH_CATEGORIES_START:
            return {
                ...state,
                isFetching: true
            };
        case ShopActionTypes.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                categories: action.payload
            };
        case ShopActionTypes.FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};

export default shopReducer;