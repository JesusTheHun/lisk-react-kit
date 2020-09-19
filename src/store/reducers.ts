import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import {History} from 'history';
import auth from 'features/auth/reducers';
import app from 'features/app/reducers';

const rootReducer = (history: History<any>) => combineReducers({
  router: connectRouter(history),
  auth,
  app,
});

export default rootReducer;
