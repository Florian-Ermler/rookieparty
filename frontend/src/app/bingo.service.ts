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
  private user: UserData = { id: '', username: '' };

  constructor(private http: HttpClient) {
    this.user$.subscribe((u) => {
      this.user = u;
    });
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
}
