import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface Result {
  data: User[];
}
interface User {
  id: '';
  name: '';
  answer_question_1: '';
  answer_question_2: '';
  answer_question_3: '';
  answer_question_4: '';
  answer_question_5: '';
  answer_question_6: '';
  answer_question_7: '';
  answer_question_8: '';
  answer_question_9: '';
  answer_question_10: '';
  answer_question_11: '';
  answer_question_12: '';
  answer_question_13: '';
  answer_question_14: '';
  answer_question_15: '';
  answer_question_16: '';
  answer_question_17: '';
  answer_question_18: '';
  answer_question_19: '';
  answer_question_20: '';
  answer_question_21: '';
  answer_question_22: '';
  answer_question_23: '';
  answer_question_24: '';
  answer_question_25: '';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private usernameUsed = false;

  async isUsernameUsed(wantedUsername: string) {
    const response: any = await firstValueFrom(
      this.http.get(
        `http://localhost:8055/items/user?filter[name][_eq]=${wantedUsername}`
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
        `http://localhost:8055/items/user?filter[name][_eq]=${username}`
      )
    );
    localStorage.setItem('rookie_id', response.data[0].id);
    localStorage.setItem('rookie_username', username);
  }

  async register(username: string) {
    const response: any = await firstValueFrom(
      this.http.post('http://localhost:8055/items/user', { name: username })
    );
    localStorage.setItem('rookie_id', response.data.id);
  }
}
