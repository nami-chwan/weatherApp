import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {

  constructor(
    private service: WeatherService
  ) {
    this.service = service;
  }

  ngOnInit() { }

}
