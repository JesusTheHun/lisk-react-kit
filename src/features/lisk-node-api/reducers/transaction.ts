import {combineReducers} from "redux";
import {createReducer} from "typesafe-actions";
import {fetchTransactionAsync, fetchTransactionListAsync} from "../actions/transaction";
import {LiskTransaction} from "../../../services/types";

export type TransactionState = Readonly<{
  isLoading: boolean;
  entity: LiskTransaction | null;
  entities: LiskTransaction[] | null;
}>

export const initialState: TransactionState = {
  isLoading: false,
  entity: null,
  entities: null,
};

export default combineReducers({
  isLoading: createReducer(initialState.isLoading)
    .handleAction(fetchTransactionAsync.request, () => true)
    .handleAction([fetchTransactionAsync.success, fetchTransactionAsync.failure], () => false),
  entity: createReducer(initialState.entity)
    .handleAction(fetchTransactionAsync.success, (state, action) => action.payload)
    .handleAction(fetchTransactionAsync.failure, () => null),
  entities: createReducer(initialState.entities)
    .handleAction(fetchTransactionListAsync.success, (state, action) => action.payload)
    .handleAction(fetchTransactionListAsync.failure, () => null)
});
