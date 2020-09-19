import {createAction} from "typesafe-actions";
import {LiskPassphrase} from "services/types";


export const login = createAction('AUTH_LOGIN')<LiskPassphrase>();
