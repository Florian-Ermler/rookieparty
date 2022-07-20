import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  constructor(private _router: Router, private _service: AuthService) {}

  username: string = '';

  async register() {
    if (this.username !== '') {
      if (!(await this._service.isUsernameUsed(this.username))) {
        this._service.register(this.username);
        localStorage.setItem('rookie_username', this.username);
        this._router.navigate(['games']);
      } else {
        alert('Name bereits vorhanden');
      }
    } else {
      alert('Bitte einen Namen eintragen');
    }
  }

  ngOnInit(): void {}
}
