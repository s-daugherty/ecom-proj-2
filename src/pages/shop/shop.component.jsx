import React from 'react';
import {Route} from 'react-router-dom';
import {createStructuredSelector } from 'reselect';
import {connect } from 'react-redux';

import CategoryOverview from '../../components/category-overview/category-overview.component';
import CategoryPage from '../category/category.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { fetchCategoriesStartAsync } from '../../redux/shop/shop.actions';
import {selectIsCategoryFetching, selectIsCategoryLoaded} from '../../redux/shop/shop.selectors';

const CategoryOverviewWithSpinner = WithSpinner(CategoryOverview);
const CategoryPageWithSpinner = WithSpinner(CategoryPage);

// using match not good to hardcode /shop - /shop doesn't need to know about these (??)
// the /:categoryId allows us to use categoryId as a parameter inside category page
class ShopPage extends React.Component {
    componentDidMount() {
        const {fetchCategoriesStartAsync} = this.props;
        fetchCategoriesStartAsync();
    }

    render() {
        const {match, isCategoryFetching, isCategoryLoaded} = this.props;
        return (
            <div className='shop-page'> 
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={props => (
                        <CategoryOverviewWithSpinner isLoading={isCategoryFetching} {...props} />
                    )} 
                />
                <Route 
                    path={`${match.path}/:categoryId`} 
                    render={props => (
                        <CategoryPageWithSpinner isLoading={!isCategoryLoaded} {...props} />
                    )} 
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCategoryFetching: selectIsCategoryFetching,
    isCategoryLoaded: selectIsCategoryLoaded
});

const mapDispatchToProps = dispatch => ({
    fetchCategoriesStartAsync: () => dispatch(fetchCategoriesStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);