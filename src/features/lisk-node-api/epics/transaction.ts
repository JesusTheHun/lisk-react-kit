import {from, of} from 'rxjs';
import {filter, switchMap, map, catchError, mergeMap} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';

import {RootEpic} from "store/types";
import {fetchTransactionAsync, fetchTransactionListAsync, postTransferTransactionAsync} from "../actions/transaction";
import {notAuthenticatedErrorAction} from "../../auth/actions";

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

export const postTransferTransactionsEpic: RootEpic = (action$, state$, {liskNodeApi}) => {
  return action$.pipe(
    filter(isActionOf(postTransferTransactionAsync.request)),
    mergeMap(action => {

      if (!state$.value.auth.passphrase) {
        return of(
          notAuthenticatedErrorAction(),
          postTransferTransactionAsync.failure({message: "no passphrase"}),
        );
      }

      return from(liskNodeApi.postTransferTransaction(action.payload, state$.value.auth.passphrase)).pipe(
        map(postTransferTransactionAsync.success),
        catchError(message => of(postTransferTransactionAsync.failure(message)))
      )
    })
  );
};
