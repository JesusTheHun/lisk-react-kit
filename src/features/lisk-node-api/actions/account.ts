import {createAsyncAction} from "typesafe-actions";
import {APIErrorResponse} from "@liskhq/lisk-api-client/dist-node/api_types";
import {LiskAccount, LiskAddress} from "../../../services/types";

export const fetchAccountAsync = createAsyncAction(
  'FETCH_ACCOUNT_REQUEST',
  'FETCH_ACCOUNT_SUCCESS',
  'FETCH_ACCOUNT_FAILURE'
)<LiskAddress, LiskAccount, APIErrorResponse>();

export const fetchAccountListAsync = createAsyncAction(
  'FETCH_ACCOUNT_LIST_REQUEST',
  'FETCH_ACCOUNT_LIST_SUCCESS',
  'FETCH_ACCOUNT_LIST_FAILURE'
)<LiskAddress[], LiskAccount[], APIErrorResponse>();
