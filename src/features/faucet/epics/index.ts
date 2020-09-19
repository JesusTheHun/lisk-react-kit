import {catchError, filter, map, tap, mergeMap} from "rxjs/operators";
import {isActionOf} from "typesafe-actions";
import {faucetAboundAsync} from "features/faucet/actions";
import {from, of} from "rxjs";
import {notification} from "antd";
import {RootEpic} from 'store/types';
import {notAuthenticatedErrorAction} from 'features/auth/actions';

export const faucetEpic: RootEpic = (action$, state$, {faucet}) => {
  return action$.pipe(
    filter(isActionOf(faucetAboundAsync.request)),
    mergeMap(action => {

      if (state$.value.auth.passphrase === undefined) {
        return of(
          notAuthenticatedErrorAction(),
          faucetAboundAsync.failure({message: "no passphrase"}),
        );
      }

      return from(faucet.abound(action.payload, state$.value.auth.passphrase)).pipe(
        map(faucetAboundAsync.success),
        tap(() => {
          notification.success({
            message: "Faucet",
            description: "Your account has been abounded, it will be visible in a few seconds",
            placement: "bottomRight",
          });
        }),
        catchError(error => {

          notification.error({
            message: "API error",
            description: error.message,
            placement: "bottomRight",
          });

          return of(faucetAboundAsync.failure(error))
        })
      )
    })
  );
};
