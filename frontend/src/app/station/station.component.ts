import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service';
import { NavHeaderComponent } from '../nav-header/nav-header.component';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
})
export class StationComponent implements OnInit {
  stations: [];

  constructor(
    private _service: StationsService,
    private _header: NavHeaderComponent
  ) {
    this.stations = [];
  }

  async updateStation(
    index: number,
    station: { name: string; solved: boolean }
  ) {
    await this._service.updateStation(index, station);
    await this._header.getPoints();
  }

  async ngOnInit() {
    this.stations = await this._service.getStations();
    console.log(this.stations);
  }
}
