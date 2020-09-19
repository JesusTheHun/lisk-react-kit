declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;

  APP_CONFIG: {
    LISK_NETWORK: 'testnet' | 'mainnet';
    LISK_NODE_API_URL: string;
    THIS_FRONT_URL: string;
  }
}

declare interface NodeModule {
  hot?: { accept: (path: string, callback: () => void) => void };
}

declare interface System {
  import<T = any>(module: string): Promise<T>;
}

declare interface Navigator {
  language: string;
}

declare var System: System;
