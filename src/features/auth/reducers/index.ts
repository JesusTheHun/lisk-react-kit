import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';
import lisk from '@liskhq/lisk-client';

import {login} from "../actions";
import {LiskPassphrase, LiskPubkey, LiskAddress} from "../../../services/types";

export type AuthState = Readonly<{
    passphrase?: LiskPassphrase;
    address?: LiskAddress;
    pubkey?: LiskPubkey;
}>

const initialState: AuthState = {
    passphrase: undefined,
    address: undefined,
    pubkey: undefined,
};

export default combineReducers({
    passphrase: createReducer(initialState.passphrase).handleAction(login, (state, action) => action.payload),
    address: createReducer(initialState.address).handleAction(login, (state, action) =>
        lisk.cryptography.getAddressAndPublicKeyFromPassphrase(action.payload).address as LiskAddress),
    pubkey: createReducer(initialState.pubkey).handleAction(login, (state, action) =>
        lisk.cryptography.getAddressAndPublicKeyFromPassphrase(action.payload).publicKey as LiskPubkey),
});
