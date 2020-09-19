import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import lisk from '@liskhq/lisk-client';

import {login, logout} from "../actions";
import {LiskPassphrase, LiskPublicKey, LiskAddress} from "../../../services/types";

export type AuthState = Readonly<{
  passphrase?: LiskPassphrase;
  address?: LiskAddress;
  publicKey?: LiskPublicKey;
}>

const initialState: AuthState = {
  passphrase: undefined,
  address: undefined,
  publicKey: undefined,
};

export default combineReducers({
  passphrase: createReducer(initialState.passphrase)
    .handleAction(login, (state, action) => action.payload)
    .handleAction(logout, () => undefined),
  address: createReducer(initialState.address)
    .handleAction(login, (state, action) => lisk.cryptography.getAddressAndPublicKeyFromPassphrase(action.payload).address as LiskAddress)
    .handleAction(logout, () => undefined),
  publicKey: createReducer(initialState.publicKey)
    .handleAction(login, (state, action) => lisk.cryptography.getAddressAndPublicKeyFromPassphrase(action.payload).publicKey as LiskPublicKey)
    .handleAction(logout, () => undefined),
});
