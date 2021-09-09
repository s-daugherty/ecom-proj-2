import {all, call} from 'redux-saga/effects';

import {fetchCategoriesStart} from './shop/shop.sagas';
import {userSagas} from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
    yield all([
        call(fetchCategoriesStart),
        call(userSagas),
        call(cartSagas)
    ]);
};