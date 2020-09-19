import {createAction} from "typesafe-actions";
import {LiskPassphrase} from "services/types";


export const login = createAction('AUTH_LOGIN')<LiskPassphrase>();
export const logout = createAction('AUTH_LOGOUT')();
export const notAuthenticatedErrorAction = createAction('AUTH_NOT_AUTHENTICATED')();
