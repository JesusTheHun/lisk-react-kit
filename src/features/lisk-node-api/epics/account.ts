import {from, of} from 'rxjs';
import {filter, switchMap, catchError, map} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';
import {fetchAccountAsync, fetchAccountListAsync} from "../actions/account";
import {RootEpic} from "../../../store/types";

export const fetchAccountEpic: RootEpic = (action$, state$, {liskNodeApi}) => {
  return action$.pipe(
    filter(isActionOf(fetchAccountAsync.request)),
    switchMap(action =>
      from(liskNodeApi.fetchAccount(action.payload)).pipe(
        map(fetchAccountAsync.success),
        catchError(message => of(fetchAccountAsync.failure(message)))
      )
    )
  );
};

export const fetchAccountsEpic: RootEpic = (action$, state$, {liskNodeApi}) => {
  return action$.pipe(
    filter(isActionOf(fetchAccountListAsync.request)),
    switchMap(action =>
      from(liskNodeApi.fetchAccounts(action.payload)).pipe(
        map(fetchAccountListAsync.success),
        catchError(message => of(fetchAccountListAsync.failure(message)))
      )
    )
  );
};
