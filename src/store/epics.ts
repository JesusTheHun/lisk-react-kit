import {combineEpics} from 'redux-observable';
import * as app from "../features/app/epics";
import * as faucet from "../features/faucet/epics";
import * as liskNodeApi from "../features/lisk-node-api/epics";

export default combineEpics(
  ...Object.values(app),
  ...Object.values(faucet),
  ...Object.values(liskNodeApi),
);
