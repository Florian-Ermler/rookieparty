import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizedGuard } from './authorized.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { BingoComponent } from './bingo/bingo.component';
import { StationComponent } from './station/station.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'games',
    component: NavHeaderComponent,
    canActivate: [AuthorizedGuard],
    children: [
      {
        path: 'bingo',
        component: BingoComponent,
        canActivateChild: [AuthorizedGuard],
      },
      {
        path: 'stations',
        component: StationComponent,
        canActivateChild: [AuthorizedGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
