import {createAsyncAction} from "typesafe-actions";
import {APIErrorResponse} from "@liskhq/lisk-api-client/dist-node/api_types";
import {LiskTransaction, LiskTransactionId} from "services/types";

export const fetchTransactionAsync = createAsyncAction(
  'FETCH_TRANSACTION_REQUEST',
  'FETCH_TRANSACTION_SUCCESS',
  'FETCH_TRANSACTION_FAILURE'
)<LiskTransactionId, LiskTransaction, APIErrorResponse>();

export const fetchTransactionListAsync = createAsyncAction(
  'FETCH_TRANSACTION_LIST_REQUEST',
  'FETCH_TRANSACTION_LIST_SUCCESS',
  'FETCH_TRANSACTION_LIST_FAILURE'
)<LiskTransactionId[], LiskTransaction[], APIErrorResponse>();
