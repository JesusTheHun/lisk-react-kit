import * as account from './account';
import * as transaction from './transaction';

export default [
  ...Object.values(account),
  ...Object.values(transaction),
]
