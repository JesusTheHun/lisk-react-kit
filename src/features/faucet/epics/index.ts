import {catchError, filter, map, switchMap, tap} from "rxjs/operators";
import {isActionOf} from "typesafe-actions";
import {faucetAboundAsync} from "features/faucet/actions";
import {from, of} from "rxjs";
import {notification} from "antd";
import {RootEpic} from 'store/types';

export const faucetEpic: RootEpic = (action$, state$, {faucet}) => {
  return action$.pipe(
    filter(isActionOf(faucetAboundAsync.request)),
    switchMap(action =>
      from(faucet.abound(action.payload, state$.value.auth.passphrase)).pipe(
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
    )
  );
};
