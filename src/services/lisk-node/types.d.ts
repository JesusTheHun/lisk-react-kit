import {LiskAddress, LiskPublicKey, Timestamp} from "../types";

export type LiskTransactionPayload<Asset> = {
  networkIdentifier: string;
  timestamp: Timestamp;
  asset: Asset;
}

export type LiskFetchPagination = {
  limit?: number;
  offset?: number;
};

export type LiskSortOrder = "asc" | "desc";

export type LiskFetchAccountSortFields = "balance" | "username";

export type LiskFetchAccountSort = {
  [key in LiskFetchAccountSortFields]?: LiskSortOrder;
}

export type LiskFetchAccountFilters = {
  address: LiskAddress;
  publicKey: LiskPublicKey;
  secondPublicKey: LiskPublicKey;
  username: string;
};

export type LiskFetchAccountPayload =
  Partial<LiskFetchPagination>
  & Partial<LiskFetchAccountSort>
  & Partial<LiskFetchAccountFilters>;
