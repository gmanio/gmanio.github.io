import * as React from 'react';

import UserStore from './user';

export class RootStore {
  userStore: UserStore;

  constructor() {
    this.userStore = new UserStore();
  }
}

const store = new RootStore();

export const StoreContext = React.createContext<RootStore>({} as RootStore);

export type StoreComponent = React.FC<{
  children: React.ReactNode;
}>;

const GlobalProvider: StoreComponent = ({ children }): React.ReactElement => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStores = () => React.useContext(StoreContext);

export default GlobalProvider;
