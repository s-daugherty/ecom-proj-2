import React from 'react';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/shop/shop.selectors';

import CategoryItem from '../../components/category-item/category-item.component';

import './category.styles.scss';

const CategoryPage = ({categories}) => {
    const {title, items} = categories;
    return (
        <div className='category-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {
                    items.map(item => <CategoryItem key={item.id} item={item} />)
                }
            </div>
        </div>
    );
};

// state is reducer state we're passing in from the top
// own props are the props of the component we're wrapping in our connect
//      ^this made a lot more sense when we were passing in match to CategoryPage... now idgi
const mapStateToProps = (state, ownProps) => ({
    categories: selectCategory(ownProps.match.params.categoryId)(state)
});

export default connect(mapStateToProps)(CategoryPage);