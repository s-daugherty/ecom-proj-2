import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectCategoriesForPreview } from '../../redux/shop/shop.selectors';
import CategoryPreview from '../category-preview/category-preview.component';

import './category-overview.styles.scss';

const CategoryOverview = ({categories}) => (
    <div className='category-overview'>
        {console.log(categories)}
        {categories.map(({id, ...otherCategoryProps}) => (
            <CategoryPreview key={id} {...otherCategoryProps} />
        ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    categories: selectCategoriesForPreview
});

export default connect(mapStateToProps)(CategoryOverview);