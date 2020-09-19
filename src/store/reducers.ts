import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import {History} from 'history';
import auth from 'features/auth/reducers';
import lisk from 'features/lisk-node-api/reducers';

const rootReducer = (history: History<any>) => combineReducers({
  router: connectRouter(history),
  auth,
  lisk,
});

export default rootReducer;
