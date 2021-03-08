import * as React from 'react';
// import { configure } from 'mobx';
// configure({
//   enforceActions: "always",
//   useProxies: 'ifavailable',
// });

import UserStore from './user';

export type StoreProvider = React.FC<{
  children: React.ReactNode;
}>;

const store = new class {
  userStore: UserStore;

  constructor() {
    this.userStore = new UserStore();
  }
};

type RootStore = {
  userStore: UserStore
};

export const StoreContext = React.createContext<RootStore>({} as RootStore);

const GlobalProvider: StoreProvider = ({ children }): React.ReactElement => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStores = () => React.useContext(StoreContext);

export default GlobalProvider;
