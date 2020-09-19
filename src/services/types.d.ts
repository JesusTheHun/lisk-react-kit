import {Brand} from "utility-types";
import {Account} from '@liskhq/lisk-transactions';

export type Timestamp = Brand<number, "Timestamp">;
export type DateString = Brand<string, "DateString">;
export type BigNumString = Brand<string, "BigNumString">;
export type LiskPassphrase = Brand<string, "LiskPassphrase">;
export type LiskAddress = Brand<string, "LiskAddress">;
export type LiskPublicKey = Brand<string, "LiskPublicKey">;

export type LiskTransactionId = Brand<string, "LiskTransactionId">;
export type LiskBlockId = Brand<string, "LiskBlockId">;
export type LiskTransactionType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface LiskAccount extends Account {
  asset: unknown;
  balance: string;
}

export interface LiskTransaction {
  id: LiskTransactionId;
  amount: BigNumString;
  fee: BigNumString;
  type: LiskTransactionType;
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
