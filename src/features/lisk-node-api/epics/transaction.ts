import {from, of} from 'rxjs';
import {filter, switchMap, map, catchError} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';

import {RootEpic} from "store/types";
import {fetchTransactionAsync, fetchTransactionListAsync} from "../actions/transaction";

export const fetchTransactionEpic: RootEpic = (action$, state$, {liskNodeApi}) => {
  return action$.pipe(
    filter(isActionOf(fetchTransactionAsync.request)),
    switchMap(action =>
      from(liskNodeApi.fetchTransaction(action.payload)).pipe(
        map(fetchTransactionAsync.success),
        catchError(message => of(fetchTransactionAsync.failure(message)))
      )
    )
  );
};

export const fetchTransactionsEpic: RootEpic = (action$, state$, {liskNodeApi}) => {
  return action$.pipe(
    filter(isActionOf(fetchTransactionListAsync.request)),
    switchMap(action =>
      from(liskNodeApi.fetchTransactions(action.payload)).pipe(
        map(fetchTransactionListAsync.success),
        catchError(message => of(fetchTransactionListAsync.failure(message)))
      )
    )
  );
};
