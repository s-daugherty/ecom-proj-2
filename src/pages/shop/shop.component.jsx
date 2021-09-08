import React from 'react';
import {Route} from 'react-router-dom';
import {connect } from 'react-redux';

import CategoryPageContainer from '../category/category.container';
import CategoryOverviewContainer from '../../components/category-overview/category-overview.container';

import { fetchCategoriesStartAsync } from '../../redux/shop/shop.actions';

// using match not good to hardcode /shop - /shop doesn't need to know about these (??)
// the /:categoryId allows us to use categoryId as a parameter inside category page
class ShopPage extends React.Component {
    componentDidMount() {
        const {fetchCategoriesStartAsync} = this.props;
        fetchCategoriesStartAsync();
    }

    render() {
        const {match} = this.props;
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
}

const mapDispatchToProps = dispatch => ({
    fetchCategoriesStartAsync: () => dispatch(fetchCategoriesStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);