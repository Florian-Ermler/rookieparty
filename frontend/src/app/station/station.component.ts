import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
})
export class StationComponent implements OnInit {
  stations: [];

  constructor(private _service: StationsService) {
    this.stations = [];
  }

  async updateStation(
    index: number,
    station: { name: string; solved: boolean }
  ) {
    this._service.updateStation(index, station);
  }

  async ngOnInit() {
    this.stations = await this._service.getStations();
    console.log(this.stations);
  }
}
