
import { action, makeAutoObservable, observable } from "mobx";
class UserStore {
  @observable
  name = 'Now';

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setName = (name:string) => {
    this.name = name;
  }
}

export default UserStore;