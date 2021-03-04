import { makeObservable, observable, computed, action } from "mobx"

class RootStore {
  private userStore: UserStore;
  private todoStore: TodoStore;
  constructor() {
      this.userStore = new UserStore()
      this.todoStore = new TodoStore()
  }
}

class UserStore {
  constructor() {
    makeObservable(this)
  }
}

class TodoStore {
  // todos = []
  // rootStore

  // constructor(rootStore) {
  //     makeAutoObservable(this, { rootStore: false })
  //     this.rootStore = rootStore
  // }
}