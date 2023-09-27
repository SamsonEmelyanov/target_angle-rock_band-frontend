import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './RegistAuthentification.css';


class RegistAuthentification extends Component {
  componentDidMount() {
   this.props.loadCurrentlyLoggedInUser()
  }

  render() {
    const {authenticated, currentUser,loading} = this.props;

    if(loading) {
      return <LoadingIndicator />
    }

    return (
      <div className="app">
        <div className="app-body">
          <Switch>
            <PrivateRoute path="/registration/profile" authenticated={authenticated} currentUser={currentUser}
                          component={Profile}></PrivateRoute>
            <Route path="/registration/login"
                   render={(props) => <Login authenticated={authenticated} {...props} />}></Route>
            <Route path="/registration/signup"
                   render={(props) => <Signup authenticated={authenticated} {...props} />}></Route>
            <Route path="/registration/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default RegistAuthentification;
