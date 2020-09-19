import {createAsyncAction} from "typesafe-actions";
import {APIErrorResponse, APIResponse} from "@liskhq/lisk-api-client/dist-node/api_types";
import {LiskTransaction, LiskTransactionId} from "services/types";
import {
  LiskFetchTransactionPayload,
  LiskPostTransactionAssetTransfer,
  LiskPostTransactionPayload
} from "services/lisk-node/types";

export const fetchTransactionAsync = createAsyncAction(
  'FETCH_TRANSACTION_REQUEST',
  'FETCH_TRANSACTION_SUCCESS',
  'FETCH_TRANSACTION_FAILURE'
)<LiskTransactionId, LiskTransaction, APIErrorResponse>();

export const fetchTransactionListAsync = createAsyncAction(
  'FETCH_TRANSACTION_LIST_REQUEST',
  'FETCH_TRANSACTION_LIST_SUCCESS',
  'FETCH_TRANSACTION_LIST_FAILURE'
)<LiskFetchTransactionPayload, LiskTransaction[], APIErrorResponse>();

export const postTransferTransactionAsync = createAsyncAction(
  'POST_TRANSFER_TRANSACTION_REQUEST',
  'POST_TRANSFER_TRANSACTION_SUCCESS',
  'POST_TRANSFER_TRANSACTION_FAILURE'
)<LiskPostTransactionPayload<LiskPostTransactionAssetTransfer>, APIResponse, APIErrorResponse>();
