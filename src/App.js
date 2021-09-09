import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndUp from './pages/sign-in-and-up/sign-in-and-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
// import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {selectCurrentUser} from './redux/user/user.selectors';


class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // const {setCurrentUser} = this.props;
    // // want to know when someone logs in/out
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
        
    //     // listener for when snapshot changes, which happens on login
    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   }

    //   setCurrentUser(userAuth);
    // } );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route 
            exact 
            path='/signin' 
            render={() => 
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndUp />
              ) 
            }
          />
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

// if a user is signed in, shouldn't be able to see sign in page
// the user that we're destructuring off is the user reducer
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(App);
