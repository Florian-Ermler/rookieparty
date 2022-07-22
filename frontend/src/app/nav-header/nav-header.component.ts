import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service';
import { BingoService } from '../bingo.service';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
})
export class NavHeaderComponent implements OnInit {
  points: number;

  constructor(
    private _bingoService: BingoService,
    private _stationService: StationsService,
    private http: HttpClient
  ) {
    this.points = 0;
  }

  async getPoints() {
    this.points = 0;
    this.points += await this._stationService.getPoints();
    this.points += await this._bingoService.getPoints();
    const response = await firstValueFrom(
      this.http.patch(
        `${environment.directusUrl}/items/user/${localStorage.getItem(
          'rookie_id'
        )}`,
        {
          points: this.points,
        }
      )
    );
  }

  async ngOnInit() {
    await this.getPoints();
  }
}
