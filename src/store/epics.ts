import {combineEpics} from 'redux-observable';
import app from "features/app/epics";
import * as faucet from "features/faucet/epics";
import liskNodeApi from "features/lisk-node-api/epics";

export default combineEpics(
  ...app,
  ...Object.values(faucet),
  ...liskNodeApi,
);
