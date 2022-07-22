import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service';
import { NavHeaderComponent } from '../nav-header/nav-header.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
})
export class StationComponent implements OnInit {
  stations: { id: string; name: string; solved: boolean }[];

  constructor(
    private _service: StationsService,
    private _route: ActivatedRoute,
    private _header: NavHeaderComponent
  ) {
    this.stations = [];
  }

  async updateStation(
    index: number,
    station: { id: string; name: string; solved: boolean }
  ) {
    await this._service.updateStation(index, station);
    await this._header.getPoints();
  }

  async ngOnInit() {
    this.stations = await this._service.getStations();
    this._route.queryParams.subscribe(async (params) => {
      if (params['complete']) {
        for (const [index, station] of this.stations.entries()) {
          if (station.id === params['complete']) {
            await this.updateStation(index, station);
          }
        }
      }
    });
  }
}
