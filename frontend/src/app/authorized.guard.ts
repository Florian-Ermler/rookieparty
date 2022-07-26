import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserData, UserState } from './store/app.store';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate, CanActivateChild {
  @Select(UserState.getUser) private user$!: Observable<UserData>;
  private user: UserData = { id: '', username: '' };

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /*     this.user$.subscribe((u) => {
      this.user = u;
    });
    if (this.user.username.trim() != '' && this.user.id.trim() != '') {
      return true;
    } else {
      return false;
    } */
    if (
      localStorage.getItem('rookie_username') &&
      localStorage.getItem('rookie_id')
    ) {
      return true;
    }
    return false;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
