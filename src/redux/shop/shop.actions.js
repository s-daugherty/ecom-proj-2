import ShopActionTypes from './shop.types';

export const updateCategories = (categoriesMap) => ({
    type: ShopActionTypes.UPDATE_CATEGORIES,
    payload: categoriesMap
});