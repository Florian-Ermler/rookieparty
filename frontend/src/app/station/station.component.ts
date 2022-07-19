import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
})
export class StationComponent implements OnInit {
  stations: stationIF[];

  constructor() {
    this.stations = [
      { name: 'mario kart', points: 0, status: 'nicht abgeschlossen' },
      { name: 'beerpon', points: 0, status: 'nicht abgeschlossen' },
      { name: 'cornhole', points: 0, status: 'nicht abgeschlossen' },
      { name: 'spikeball', points: 0, status: 'nicht abgeschlossen' },
    ];
  }

  ngOnInit(): void {}
}

interface stationIF {
  name: string;
  points: number;
  status: string;
}
