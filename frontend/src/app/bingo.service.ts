import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Select } from '@ngxs/store';
import { UserData, UserState } from './store/app.store';

@Injectable({
  providedIn: 'root',
})
export class BingoService {
  @Select(UserState.getUser) private user$!: Observable<UserData>;
  private user: any = { id: '', username: '' };

  constructor(private http: HttpClient) {
    /*     this.user$.subscribe((u) => {
      this.user = u;
    }); */

    this.user.id = localStorage.getItem('rookie_id');
    this.user.username = localStorage.getItem('rookie_username');
  }

  async getBingo() {
    const response: any = await firstValueFrom(
      this.http.get(`${environment.directusUrl}/items/bingo?sort=number`)
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
    if (this.user.username.trim() != '') {
      const response: any = await firstValueFrom(
        this.http.get(
          `${
            environment.directusUrl
          }/items/user?filter[name][_eq]=${this.user.username.trim()}`
        )
      );
      return response.data[0].question_answers;
    }
  }

  async getUserStations() {
    const response: any = await firstValueFrom(
      this.http.get(
        `${
          environment.directusUrl
        }/items/user?filter[name][_eq]=${this.user.username.trim()}&fields=*,solved_stations.station_id`
      )
    );
  }

  async updateAnswer(question_number: number[], answer: string) {
    if (this.user.id.trim()) {
      const answerArray: string[][] = await this.getUserAnswers();
      answerArray[question_number[0]][question_number[1]] = answer;
      const response = await firstValueFrom(
        this.http.patch(
          `${environment.directusUrl}/items/user/${this.user.id.trim()}`,
          {
            question_answers: answerArray,
          }
        )
      );
    }
  }

  private allAreTrue(arr: boolean[]) {
    return arr.every((element) => element === true);
  }

  async getPoints() {
    let points = 0;
    const pointArrayY: boolean[][] = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];
    const pointArrayX: boolean[][] = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];
    const pointArrayYX: boolean[] = [false, false, false, false, false];
    const pointArrayXY: boolean[] = [false, false, false, false, false];

    const answerArray: string[][] = await this.getUserAnswers();

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (answerArray[y][x].trim() != '') {
          pointArrayY[y][x] = true;
        }
        if (answerArray[x][y].trim() != '') {
          pointArrayX[y][x] = true;
        }
        if (y == x) {
          if (answerArray[y][x].trim() != '') {
            pointArrayYX[y] = true;
          }
        }
        if (x + y == 4) {
          if (answerArray[y][x].trim() != '') {
            pointArrayXY[y] = true;
          }
        }
      }
      if (this.allAreTrue(pointArrayY[y])) {
        points += 15;
      }
      if (this.allAreTrue(pointArrayX[y])) {
        points += 15;
      }
      if (this.allAreTrue(pointArrayYX)) {
        points += 30;
      }
      if (this.allAreTrue(pointArrayXY)) {
        points += 30;
      }
    }

    return points;
  }
}
