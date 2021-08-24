import React from 'react';
import {Route} from 'react-router-dom';

import CategoryOverview from '../../components/category-overview/category-overview.component';
import CategoryPage from '../category/category.component';

// using match not good to hardcode /shop - /shop doesn't need to know about these (??)
// the /:categoryId allows us to use categoryId as a parameter inside category page
const ShopPage = ({match}) => (
    <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CategoryOverview} />
        <Route path={`${match.path}/:categoryId`} component={CategoryPage} />
    </div>
);

export default ShopPage;