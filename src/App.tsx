import React, {Component} from 'react';
import {ConnectedRouter} from 'connected-react-router';
import {Switch, Route} from 'react-router';

import {history} from './store';
import HomeScreen from './screens/HomeScreen';
import Http404Screen from './screens/Http404Screen';
import {getPath} from './utils/router-paths';
import './App.scss';
import AccountScreen from "./screens/AccountScreen";
import LoginScreen from "./screens/LoginScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import {FeatTypeScreen} from "./screens/FeatTypeScreen";
import IssuerScreen from "./screens/IssuerScreen";

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={getPath('home')} component={HomeScreen}/>
          <Route exact path={getPath('login')} component={SignInScreen}/>
          <Route exact path={getPath('createAccount')} component={CreateAccountScreen}/>

          <Route exact path={getPath('authority', ':issuerId?')} component={IssuerScreen}/>
          <Route exact path={getPath('featType', ':featTypeId?')} component={FeatTypeScreen}/>

          <Route exact path={getPath('account')} component={AccountScreen}/>

          <Route component={Http404Screen}/>
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default App;
