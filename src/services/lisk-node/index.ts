import {getClient} from "./utils";
import {LiskAccount, LiskTransaction, LiskTransactionId} from 'services/types';
import {LiskFetchAccountPayload} from './types';

const client = getClient();

export function fetchAccount<T = LiskAccount>(fetchParams: LiskFetchAccountPayload): Promise<T> {
  return client.accounts.get(fetchParams).then(r => {
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
