import React from 'react';
import {Route} from 'react-router-dom';
import {connect } from 'react-redux';

import CategoryOverview from '../../components/category-overview/category-overview.component';
import CategoryPage from '../category/category.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import {
    firestore, 
    convertCategoriesSnapshotToMap
} from '../../firebase/firebase.utils';

import { updateCategories } from '../../redux/shop/shop.actions';

const CategoryOverviewWithSpinner = WithSpinner(CategoryOverview);
const CategoryPageWithSpinner = WithSpinner(CategoryPage);

// using match not good to hardcode /shop - /shop doesn't need to know about these (??)
// the /:categoryId allows us to use categoryId as a parameter inside category page
class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {updateCategories} = this.props;
        const categoriesRef = firestore.collection('collections');

        categoriesRef.get().then(snapshot => {
            const categoriesMap = convertCategoriesSnapshotToMap(snapshot);
            updateCategories(categoriesMap);
            this.setState({loading: false});
        });
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;
        return (
            <div className='shop-page'> 
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={props => (
                        <CategoryOverviewWithSpinner isLoading={loading} {...props} />
                    )} 
                />
                <Route 
                    path={`${match.path}/:categoryId`} 
                    render={props => (
                        <CategoryPageWithSpinner isLoading={loading} {...props} />
                    )} 
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCategories: categoriesMap => 
        dispatch(updateCategories(categoriesMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);