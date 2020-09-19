import {Brand} from "utility-types";
import {Account} from '@liskhq/lisk-transactions';

export type TxId = string;
export type FeatTypeId = TxId;
export type Address = string;

export interface LiskAccount extends Account {
  asset: unknown;
  balance: string;
}

export type LiskPassphrase = Brand<string, "LiskPassphrase">;
export type LiskAddress = Brand<string, "LiskAddress">;
export type LiskPubkey = Brand<string, "LiskPubkey">;
