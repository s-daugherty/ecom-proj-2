import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndUp from './pages/sign-in-and-up/sign-in-and-up.component';
import {auth} from './firebase/firebase.utils';
import { canConstructResponseFromBodyStream } from 'workbox-core/_private';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }


  unsubscribeFromAuth = null;

  componentDidMount() {
    // want to know when someone logs in/out
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user});
    } );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
