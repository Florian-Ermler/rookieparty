import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

export interface UserData {
  id: string;
  username: string;
}

export class UserDataModel {
  user: UserData = {
    id: '',
    username: '',
  };
}

export class SetUser {
  static readonly type = '[app] set user';
  constructor(public payload: UserData) {}
}

@State<UserDataModel>({
  name: 'user',
  defaults: { user: { id: '', username: '' } },
})
@Injectable()
export class UserState {
  @Selector()
  static getUser(state: UserDataModel) {
    return state.user;
  }

  @Action(SetUser)
  setUser(ctx: StateContext<UserDataModel>, { payload }: SetUser) {
    ctx.patchState({ user: payload });
    console.log(ctx.getState());
  }
}
