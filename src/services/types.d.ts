/**
 * Contains all Lisk Types
 */


import {Brand} from "utility-types";
import {Account} from '@liskhq/lisk-transactions';

export type Timestamp = Brand<number, "Timestamp">;
export type DateString = Brand<string, "DateString">;
export type LSK = Brand<string, "LSK">;
export type Beddows = Brand<string, "Beddows">;
export type LiskPassphrase = Brand<string, "LiskPassphrase">;
export type LiskAddress = Brand<string, "LiskAddress">;
export type LiskPublicKey = Brand<string, "LiskPublicKey">;

export type LiskTransactionId = Brand<string, "LiskTransactionId">;
export type LiskBlockId = Brand<string, "LiskBlockId">;
export type LiskNativeTransactionType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Add your custom transaction type at the end
export type LiskTransactionType = LiskNativeTransactionType & 1000;

export interface LiskAccountCredentials {
  passphrase: LiskPassphrase;
  publicKey: LiskPublicKey;
  address: LiskAddress;
}

export interface LiskAccount extends Account {
  asset: unknown;
  balance: Beddows;
}

export interface LiskTransaction {
  id: LiskTransactionId;
  amount: Beddows;
  fee: Beddows;
  type: LiskNativeTransactionType;
  height: number;
  blockId: LiskBlockId;
  timestamp: Timestamp;
  senderId: LiskAddress;
  senderPublicKey: LiskPublicKey;
  senderSecondPublicKey: LiskPublicKey;
  recipientId: LiskAddress;
  recipientPublicKey: LiskPublicKey;
  signature: string;
  signSignature: string;
  signatures: string[];
  confirmations: number;
  asset: any;
  receivedAt: DateString;
  relays: number;
  ready: boolean;
}
