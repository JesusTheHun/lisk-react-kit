import {APIResponse} from "@liskhq/lisk-api-client/dist-node/api_types";
import {getBlockchainTimestamp, getClient, networkIdentifier} from "../lisk-node-sdk-v3/utils";
import {utils} from "@liskhq/lisk-transactions";
import {FaucetTransaction, FaucetTransactionAsset} from "lisk-transaction-faucet";
import {LiskTransactionPayload} from "../lisk-node-sdk-v3/types";
import {LiskPassphrase} from "services/types";

const client = getClient();

export function abound(payload: FaucetTransactionAsset, passphrase: LiskPassphrase): Promise<APIResponse> {
  const transactionPayload: LiskTransactionPayload<FaucetTransactionAsset> = {
    networkIdentifier,
    timestamp: getBlockchainTimestamp(),
    asset: {
      amount: utils.convertLSKToBeddows(payload.amount),
      recipientId: payload.recipientId,
    },
  };

  const transaction = new FaucetTransaction(transactionPayload);
  transaction.sign(passphrase);

  return client.transactions.broadcast(transaction.toJSON());
}
