import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  private username: string | null;
  private userId: string | null;

  constructor(private http: HttpClient) {
    this.username = localStorage.getItem('rookie_username');
    this.userId = localStorage.getItem('rookie_id');
  }

  async getBingo() {
    const response: any = await firstValueFrom(
      this.http.get('http://localhost:8055/items/bingo?sort=number')
    );
    const matrix: string[][] = [[], [], [], [], []];
    let counter = 0;
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        matrix[y][x] = response.data[counter];
        counter++;
      }
    }
    return matrix;
  }

  async getUserAnswers() {
    this.username = localStorage.getItem('rookie_username');
    if (this.username) {
      const response: any = await firstValueFrom(
        this.http.get(
          `http://localhost:8055/items/user?filter[name][_eq]=${this.username}`
        )
      );
      return response.data[0].question_answers;
    }
  }

  async getUserStations() {
    const response: any = await firstValueFrom(
      this.http.get(
        `http://localhost:8055/items/user?filter[name][_eq]=${this.username}&fields=*,solved_stations.station_id`
      )
    );
  }

  async updateAnswer(question_number: number[], answer: string) {
    if (this.userId) {
      const answerArray: string[][] = await this.getUserAnswers();
      answerArray[question_number[0]][question_number[1]] = answer;
      const response = await firstValueFrom(
        this.http.patch(`http://localhost:8055/items/user/${this.userId}`, {
          question_answers: answerArray,
        })
      );
    }
  }
}
