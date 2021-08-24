import {createSelector} from 'reselect';

const CATEGORY_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
};

const selectShop = state => state.shop;

export const selectCategories = createSelector(
    [selectShop],
    (shop) => shop.categories
);

export const selectCategory = categoryUrlParam => createSelector(
    [selectCategories],
    categories => categories.find(
        category => category.id === CATEGORY_ID_MAP[categoryUrlParam])
);