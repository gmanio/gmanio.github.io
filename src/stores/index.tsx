import * as React from 'react';
import RootStore from './RootStore';
// import { configure } from 'mobx';
// configure({
//   enforceActions: "always",
//   useProxies: 'ifavailable',
// });

export const StoreContext = React.createContext<RootStore>({} as RootStore);

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }): React.ReactElement => {
  const store = new RootStore();

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export default GlobalProvider;

export const useStores = () => React.useContext(StoreContext);