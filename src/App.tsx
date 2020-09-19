import React, {Component} from 'react';
import {ConnectedRouter} from 'connected-react-router';
import {Switch, Route} from 'react-router';

import {history} from './store';
import HomeScreen from 'components/pages/HomeScreen';
import Http404Screen from 'components/pages/Http404Screen';
import {getPath} from './utils/router-paths';
import './App.scss';
import AccountScreen from "components/pages/AccountScreen";
import LoginScreen from "components/pages/LoginScreen";
import CreateAccountScreen from "components/pages/CreateAccountScreen";

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={getPath('home')} component={HomeScreen}/>
          <Route exact path={getPath('login')} component={LoginScreen}/>
          <Route exact path={getPath('createAccount')} component={CreateAccountScreen}/>
          <Route exact path={getPath('account')} component={AccountScreen}/>

          <Route component={Http404Screen}/>
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default App;
