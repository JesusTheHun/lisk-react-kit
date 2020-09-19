import {Brand} from "utility-types";
import {Account} from '@liskhq/lisk-transactions';

export interface LiskAccount extends Account {
  asset: unknown;
  balance: string;
}

export type LiskPassphrase = Brand<string, "LiskPassphrase">;
export type LiskAddress = Brand<string, "LiskAddress">;
export type LiskPublicKey = Brand<string, "LiskPublicKey">;

export type LiskTransactionId = Brand<string, "TransactionId">;
