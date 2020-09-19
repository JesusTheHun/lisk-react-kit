import {getClient} from "./utils";
import {LiskAccount, LiskTransaction, LiskAddress, LiskTransactionId} from 'services/types';
import {LiskFetchAccountPayload, LiskFetchTransactionPayload} from './types';

const client = getClient();

export function fetchAccount<T = LiskAccount>(address: LiskAddress): Promise<T> {
  return client.accounts.get({address}).then(r => {
    const data = r.data as T[];

    if (data.length === 0) throw new Error("Account not found");

    return data[0];
  });
}

export function fetchTransaction<T = LiskTransaction>(id: LiskTransactionId): Promise<T> {
  return client.transactions.get({id}).then(r => {
    const data = r.data as T[];

    if (data.length === 0) throw new Error("Transaction not found");

    return data[0];
  });
}

export function fetchAccounts<T = LiskAccount>(fetchParams: LiskFetchAccountPayload): Promise<T[]> {
  return client.accounts.get(fetchParams).then(r => {
    return r.data as T[];
  });
}

export function fetchTransactions<T = LiskTransaction>(fetchParams: LiskFetchTransactionPayload): Promise<T[]> {
  return client.transactions.get(fetchParams).then(r => {
    return r.data as T[];
  });
}
