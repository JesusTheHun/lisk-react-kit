import {combineReducers} from "redux";
import {createReducer} from "typesafe-actions";
import {fetchAccountAsync, fetchAccountListAsync} from "../actions/account";
import {LiskAccount} from "../../../services/types";

export type AccountState = Readonly<{
  isLoading: boolean;
  entity: LiskAccount | null;
  entities: LiskAccount[] | null;
}>

export const initialState: AccountState = {
  isLoading: false,
  entity: null,
  entities: null,
};

export default combineReducers({
  isLoading: createReducer(initialState.isLoading)
    .handleAction(fetchAccountAsync.request, () => true)
    .handleAction([fetchAccountAsync.success, fetchAccountAsync.failure], () => false),
  entity: createReducer(initialState.entity)
    .handleAction(fetchAccountAsync.success, (state, action) => action.payload)
    .handleAction(fetchAccountAsync.failure, () => null),
  entities: createReducer(initialState.entities)
    .handleAction(fetchAccountListAsync.success, (state, action) => action.payload)
    .handleAction(fetchAccountListAsync.failure, () => null)
});
