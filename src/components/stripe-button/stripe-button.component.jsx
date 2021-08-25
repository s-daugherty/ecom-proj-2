import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import './stripe-button.styles.scss';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe= price * 100; //stripe needs cents
    const publishableKey = 'pk_test_51JSSjJEViHVXBoPoo1KsM5VbPrCjvyPCa0e1JSAoO01uH8lPJswX890GBCh5liucaKHh4jVzoyjgUvGAJ7txiOE400kiafRBTM';

    // this is where we'd actually process the payment
    const onToken = token => {
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay Now'
            name='Ecom Project Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            paneLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;