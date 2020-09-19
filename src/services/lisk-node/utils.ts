import {getNetworkIdentifier} from "@liskhq/lisk-cryptography";
import {EPOCH_TIME} from "@liskhq/lisk-constants";
import {APIClient} from "@liskhq/lisk-api-client";
import {Timestamp} from "../types";

export const networkIdentifier = getNetworkIdentifier(
  "23ce0366ef0a14a91e5fd4b1591fc880ffbef9d988ff8bebf8f3666b0c09597d",
  "Lisk",
);

export const getBlockchainTimestamp = () => {
  const millisSinceEpoc = Date.now() - EPOCH_TIME.getTime();
  const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
  return parseInt(inSeconds) as Timestamp;
};

export const getClient = () => {
  if (window.APP_CONFIG.LISK_NETWORK === 'testnet') {
    return APIClient.createTestnetAPIClient({
      node: window.APP_CONFIG.LISK_NODE_API_URL,
    });
  }

  return APIClient.createMainnetAPIClient({
    node: window.APP_CONFIG.LISK_NODE_API_URL,
  });
}
