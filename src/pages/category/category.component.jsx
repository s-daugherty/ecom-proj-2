import React from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/shop/shop.selectors';

import './category.styles.scss';

const CategoryPage = ({collection}) => (
    <div className='category-page'>
        <h2>category page</h2>
    </div>
);

// state is reducer state we're passing in from the top
// own props are the props of the component we're wrapping in our connect
//      ^this made a lot more sense when we were passing in match to CategoryPage... now idgi
const mapStateToProps = (state, ownProps) => ({
    category: selectCategory(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CategoryPage);