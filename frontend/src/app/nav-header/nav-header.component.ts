import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service';
import { BingoService } from '../bingo.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
})
export class NavHeaderComponent implements OnInit {
  points: number;

  constructor(
    private _bingoService: BingoService,
    private _stationService: StationsService
  ) {
    this.points = 0;
  }

  async getPoints() {
    this.points = 0;
    this.points += await this._stationService.getPoints();
    this.points += await this._bingoService.getPoints();
  }

  async ngOnInit() {
    await this.getPoints();
  }
}
