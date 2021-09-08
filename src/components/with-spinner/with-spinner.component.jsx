import React from 'react';

import {SpinnerOverlay, SpinnerContainer} from './with-spinner.styles';

// higher order component 
//  conditionally renders either the spinner or the wrapped component (our app)
const WithSpinner = WrappedComponent => {
    const Spinner = ({isLoading, ...otherProps}) => { 
        return isLoading ? (
            <SpinnerOverlay>
                <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps} />
        );
    };
    return Spinner;
};

export default WithSpinner;