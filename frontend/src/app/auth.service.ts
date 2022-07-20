import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Store, Select } from '@ngxs/store';
import { SetUser, UserData, UserState } from './store/app.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private _store: Store) {}

  private usernameUsed = false;

  async isUsernameUsed(wantedUsername: string) {
    const response: any = await firstValueFrom(
      this.http.get(
        `${environment.directusUrl}/items/user?filter[name][_eq]=${wantedUsername}`
      )
    );
    if (response.data.length > 0) {
      this.usernameUsed = true;
    } else {
      this.usernameUsed = false;
    }
    return this.usernameUsed;
  }

  async login(username: string) {
    const response: any = await firstValueFrom(
      this.http.get(
        `${environment.directusUrl}/items/user?filter[name][_eq]=${username}`
      )
    );
    this._store.dispatch(new SetUser({ id: response.data[0].id, username }));
  }

  async register(username: string) {
    const response: any = await firstValueFrom(
      this.http.post(`${environment.directusUrl}/items/user`, {
        name: username,
      })
    );
    localStorage.setItem('rookie_id', response.data.id);
  }
}
