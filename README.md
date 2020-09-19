# Lisk React Kit

Get started quickly with your Lisk frontend.
Clone this repository and start adding your features.

Features included :

- Create new account
- Login
- Logout
- Account page
- Faucet

## Quick Start
   
Clone the repo and install dependencies
   
```bash
git clone https://github.com/JesusTheHun/lisk-react-kit.git
cd lisk-react-kit
yarn install
```

### Configure

`.env` files are used to configure your project. The `.env` file is loaded in all environment, 
`.env.<process.NODE_ENV>` is then loaded, and finally `.env.<process.NODE_ENV>.local`.

The config includes the following

```bash
LISK_NETWORK=testnet
LISK_NODE_API_URL=https://testnet.lisk.io
THIS_FRONT_URL=http://localhost:3000   # used to generate exportable URLs
```

### FAQ

##### I see weird types such as Beddows, that's just a string right ?

Yes, it is a branded string. It is a fake type to carry some semantic with it. So you know what this string is used for.
There are several types like that such as `LiskPassphrase`, `LiskAddress`, `LSK`, `Beddows` and more. 
You can see a complete list in `services/types.d.ts`.

##### When I create an account and then log in I see an error showing up, why ? 
This project includes a faucet that will abound the account upon creation. 
If the Lisk node you configured do not accept such transaction, it will result in an error.

##### I'm not familiar with RxJs or Redux Observable, how do I get started ?

If you are not familiar with `redux-observable` (link at the end), the mechanic is divided in 3 steps :

An action is dispatched (redux), the action is treated by an epic (rxjs) and then eventually one or more action are dispatched.
For example you dispatch `fetchAccount.request`, the epic will see the action, trigger an API call and then
dispatch a new action `fetchAccount.success` with the API response as the action payload.
The actions are reduced by redux like the usuals. 

##### How do I add my own custom transactions ?

Inside `services` create a new directory names after your project, `myBlockchain` for example.
Create a new file named `types.d.ts` and create your custom transaction asset type. 
You can take example on `LiskPostTransactionAssetTransfer` 

```typescript
export type LiskPostTransactionAssetTransfer = {
  amount: Beddows;
  recipientId: LiskAddress;
};
```  

Then create the action to post such transaction

```typescript
export const postTransferTransactionAsync = createAsyncAction(
  'POST_TRANSFER_TRANSACTION_REQUEST',
  'POST_TRANSFER_TRANSACTION_SUCCESS',
  'POST_TRANSFER_TRANSACTION_FAILURE'
)<LiskPostTransactionPayload<LiskPostTransactionAssetTransfer>, LiskTransaction, APIErrorResponse>();
```

Epic

```typescript
export const postTransactionsEpic: RootEpic = (action$, state$, {liskNodeApi}) => {
  return action$.pipe(
    filter(isActionOf(fetchTransactionListAsync.request)),
    concatMap(action =>
      from(liskNodeApi.fetchTransactions(action.payload)).pipe(
        map(fetchTransactionListAsync.success),
        catchError(message => of(fetchTransactionListAsync.failure(message)))
      )
    )
  );
};
```

## Contributions

I will gladly accept PRs for this project. If you want to contribute but don't know what to do, here is a list of things that need work :

- Inconsistent error return from service to epic

## Build With

* [ReactJS](https://reactjs.org)
* [RxJS](https://rxjs-dev.firebaseapp.com/guide/overview)
* [Redux-Observable](https://redux-observable.js.org)
* [Redux]()
* [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) 
* [Ant Design](https://ant.design/)

### Authors

This project has been developed by Jonathan 'JesusTheHun' MASSUCHETTI.

### License

Licensed under the GPL v3 License

### Support & Donations

I'm currently running a campaign to become a forging delegate. My delegate name is `jesusthehun`. 
You can share your support by voting for me !
You can also support the development of this repo by making a donation to `14260358272659413479L`
