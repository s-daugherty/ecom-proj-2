import {createSelector} from 'reselect';

import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCategories = createSelector(
    [selectShop],
    (shop) => shop.categories
);

export const selectCategory = memoize((categoryUrlParam) => 
    createSelector(
        [selectCategories],
        categories => categories ? categories[categoryUrlParam] : null
));

export const selectCategoriesForPreview = createSelector(
    [selectCategories],
    categories => categories ? Object.keys(categories).map(key => categories[key]) : []
);

export const selectIsCategoryFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCategoryLoaded = createSelector(
    [selectShop],
    shop => !!shop.categories
)