/**
 * Contains types used to perform requests
 */

import {
  LiskAddress,
  LiskPublicKey,
  LiskTransactionId,
  LiskNativeTransactionType,
  Timestamp,
  LiskTransactionType, Beddows
} from "../types";

export type LiskFetchPagination = {
  limit?: number;
  offset?: number;
};

export type LiskSortOrder = "asc" | "desc";

// Accounts

export type LiskFetchAccountSortFields = "balance" | "username";

export type LiskFetchAccountSort = {
  [key in LiskFetchAccountSortFields]?: LiskSortOrder;
}

export type LiskFetchAccountFilters = {
  id: LiskTransactionId;
  recipientId: LiskAddress;
  recipientPublicKey: LiskPublicKey;
  senderId: LiskAddress;
  senderPublicKey: LiskPublicKey;
  senderIdOrRecipientId: LiskAddress;
  type: LiskNativeTransactionType;
  height: number;
  minAmount: number;
  maxAmount: number;
  fromTimestamp: Timestamp;
  toTimestamp: Timestamp;
  blockId: string;
  data: string;
};

export type LiskFetchAccountPayload =
  Partial<LiskFetchPagination>
  & Partial<LiskFetchAccountSort>
  & Partial<LiskFetchAccountFilters>;

// Transactions

export type LiskFetchTransactionSortFields = "amount" | "fee" | "type" | "timestamp";

export type LiskFetchTransactionSort = {
  [key in LiskFetchAccountSortFields]?: LiskSortOrder;
}

export type LiskFetchTransactionFilters = {
  address: LiskAddress;
  publicKey: LiskPublicKey;
  secondPublicKey: LiskPublicKey;
  username: string;
};

export type LiskFetchTransactionPayload =
  Partial<LiskFetchPagination>
  & Partial<LiskFetchTransactionSort>
  & Partial<LiskFetchTransactionFilters>;

export type LiskPostTransactionPayload<Asset = {}> = {
  networkIdentifier: string;
  timestamp: Timestamp;
  asset: Asset;
}

export type LiskPostTransactionAssetTransfer = {
  data?: string;
  amount: Beddows;
  recipientId: LiskAddress;
};
