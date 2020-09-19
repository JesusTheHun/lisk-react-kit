import {createAsyncAction} from "typesafe-actions";
import {APIErrorResponse, APIResponse} from "@liskhq/lisk-api-client/dist-node/api_types";
import {FaucetTransactionAsset} from "lisk-transaction-faucet";

export const faucetAboundAsync = createAsyncAction(
  'FAUCET_ABOUND_REQUEST',
  'FAUCET_ABOUND_SUCCESS',
  'FAUCET_ABOUND_FAILURE'
)<FaucetTransactionAsset, APIResponse, APIErrorResponse>();
