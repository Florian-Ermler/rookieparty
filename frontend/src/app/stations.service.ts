import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { UserData, UserState } from './store/app.store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  @Select(UserState.getUser) private user$!: Observable<UserData>;
  private user: UserData = { id: '', username: '' };

  constructor(private http: HttpClient) {
    this.user$.subscribe((u) => {
      this.user = u;
    });
  }

  async getStations() {
    const response: any = await firstValueFrom(
      this.http.get(
        `${environment.directusUrl}/items/user?filter[name][_eq]=${this.user.username}`
      )
    );
    return response.data[0].stations;
  }

  async updateStation(
    index: number,
    station: { name: string; solved: boolean }
  ) {
    const stations: { name: string; solved: boolean }[] =
      await this.getStations();
    station.solved = true;
    stations[index] = station;
    const response = await firstValueFrom(
      this.http.patch(`${environment.directusUrl}/items/user/${this.user.id}`, {
        stations,
      })
    );
    console.log(response);
  }
}
