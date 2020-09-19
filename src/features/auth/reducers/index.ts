import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import lisk from '@liskhq/lisk-client';

import {login, logout} from "../actions";
import {LiskPassphrase, LiskPublicKey, LiskAddress} from "services/types";

export type AuthState = Readonly<{
  passphrase: LiskPassphrase | null;
  address: LiskAddress | null;
  publicKey: LiskPublicKey | null;
}>

const initialState: AuthState = {
  passphrase: null,
  address: null,
  publicKey: null,
};

export default combineReducers({
  passphrase: createReducer(initialState.passphrase)
    .handleAction(login, (state, action) => action.payload)
    .handleAction(logout, () => null),
  address: createReducer(initialState.address)
    .handleAction(login, (state, action) => lisk.cryptography.getAddressAndPublicKeyFromPassphrase(action.payload).address as LiskAddress)
    .handleAction(logout, () => null),
  publicKey: createReducer(initialState.publicKey)
    .handleAction(login, (state, action) => lisk.cryptography.getAddressAndPublicKeyFromPassphrase(action.payload).publicKey as LiskPublicKey)
    .handleAction(logout, () => null),
});
