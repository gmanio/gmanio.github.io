import UserStore from './user';

export type StoreProvider = React.FC<{ children: React.ReactNode }>;

class RootStore {
  userStore: UserStore;

  constructor() {
    this.userStore = new UserStore();
  }
};

export default RootStore;