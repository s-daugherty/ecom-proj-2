import React, {useEffect} from 'react';
import {Route} from 'react-router-dom';
import {connect } from 'react-redux';

import { fetchCategoriesStart } from '../../redux/shop/shop.actions';

import CategoryPageContainer from '../category/category.container';
import CategoryOverviewContainer from '../../components/category-overview/category-overview.container';

// using match not good to hardcode /shop - /shop doesn't need to know about these (??)
// the /:categoryId allows us to use categoryId as a parameter inside category page
const ShopPage = ({fetchCategoriesStart, match}) => {
    useEffect(() => {
        fetchCategoriesStart();
    }, [fetchCategoriesStart]);

    return (
        <div className='shop-page'> 
            <Route 
                exact 
                path={`${match.path}`} 
                component={CategoryOverviewContainer}
            />
            <Route 
                path={`${match.path}/:categoryId`} 
                component={CategoryPageContainer} 
            />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    fetchCategoriesStart: () => dispatch(fetchCategoriesStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);