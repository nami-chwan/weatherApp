import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/services/weather.service';
import { Weather } from '../shared/models/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  private weather:Weather;

  constructor(
    private service: WeatherService
  ) {
    this.service = service;
    this.weather = this.service.getWeather();
  }

  ngOnInit() { }

}
