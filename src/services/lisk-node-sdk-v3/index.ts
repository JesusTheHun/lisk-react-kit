import {getClient} from "./utils";
import {LiskAccount} from 'services/types';

const client = getClient();

export function fetchAccountDetails<T = LiskAccount>(address: string): Promise<T> {
  return client.accounts.get({address}).then(r => {
    const data = r.data as T[];

    if (data.length === 0) throw new Error("Account not found");

    return data[0];
  });
}

export function fetchTransaction<T>(id: string): Promise<T> {
  return client.transactions.get({id}).then(r => {
    const data = r.data as T[];

    if (data.length === 0) throw new Error("Transaction not found");

    return data[0];
  });
}

export default {fetchAccountDetails, fetchTransaction}
