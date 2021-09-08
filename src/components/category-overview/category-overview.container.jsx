// component that gets wrapped in all the higher order components it needs

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {selectIsCategoryFetching} from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CategoryOverview from './category-overview.component';

// isLoading because that's the same var that the withspinner components were expecting previously
const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCategoryFetching
});

const CategoryOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CategoryOverview);
// ^ works same as connect(mapStateToProps)(WithSpinner(CategoriesOverview))

export default CategoryOverviewContainer;