import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  private username: string | null;
  private userId: string | null;
  private returnVal: {};

  constructor(private http: HttpClient) {
    this.username = localStorage.getItem('rookie_username');
    this.userId = localStorage.getItem('rookie_id');
    this.returnVal = {};
  }

  async getBingo() {
    const response: any = await firstValueFrom(
      this.http.get('http://localhost:8055/items/bingo?sort=number')
    );
    return response.data;
  }

  async getUserAnswers() {
    this.username = localStorage.getItem('rookie_username');
    if (this.username) {
      const response: any = await firstValueFrom(
        this.http.get(
          `http://localhost:8055/items/user?filter[name][_eq]=${this.username}`
        )
      );

      this.returnVal = Object.keys(response.data[0])
        .filter((key) => {
          return key.includes('answer_question');
        })
        .map((key) => {
          return response.data[0][key];
        });
    }
    return this.returnVal;
  }

  async getUserStations() {
    const response: any = await firstValueFrom(
      this.http.get(
        `http://localhost:8055/items/user?filter[name][_eq]=${this.username}&fields=*,solved_stations.station_id`
      )
    );
  }

  async updateAnswer(question_number: number, answer: string) {
    if (this.userId) {
      const response = await firstValueFrom(
        this.http.patch(`http://localhost:8055/items/user/${this.userId}`, {
          [`answer_question_${question_number + 1}`]: answer,
        })
      );
      await this.getUserAnswers();
    }
  }
}
