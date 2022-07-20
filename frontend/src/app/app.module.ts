import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './store/app.store';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BingoComponent } from './bingo/bingo.component';
import { StationComponent } from './station/station.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { RegisterComponent } from './register/register.component';
import { RouterState } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BingoComponent,
    StationComponent,
    NavHeaderComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxsModule.forRoot([UserState]),
    ZXingScannerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
