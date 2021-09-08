import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    categories: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.UPDATE_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        default:
            return state;
    }
};

export default shopReducer;