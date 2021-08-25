import React from 'react';
import {connect} from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import {addItemToCart} from '../../redux/cart/cart.actions';

import './category-item.styles.scss';

const CategoryItem = ({item, addItemToCart}) => {
    const {name, price, imageUrl} = item;
    return (
    <div className='category-item'>
        <div 
            className='image' 
            style={{
                backgroundImage: `url(${imageUrl})`
            }}
        />
        <div className='category-footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <CustomButton onClick={() => addItemToCart(item)} inverted>Add to cart</CustomButton>
    </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addItemToCart: item => dispatch(addItemToCart(item))
})

export default connect(null, mapDispatchToProps)(CategoryItem);