import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  username: string | undefined;

  constructor(private _router: Router, private _service: AuthService) {}

  async login() {
    if (this.username) {
      if (this.username.trim() === '') return;
      if (await this._service.isUsernameUsed(this.username)) {
        await this._service.login(this.username);
        this._router.navigate(['games']);
      } else {
        alert('Nutzer ist nicht bekannt');
      }
    } else {
      alert('Bitte einen Namen eintragen');
    }
  }

  ngOnInit(): void {}
}
