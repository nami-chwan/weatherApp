import { Injectable } from '@angular/core';
import { PositionService } from './position.service';
import { WeatherService } from './weather.service';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private positionService: PositionService,
    private weatherService: WeatherService,
    private city: City
  ) {
    // this.positionService = new PositionService;
    this.weatherService = new WeatherService;
    this.create("");
  }

  public create(name) {
    this.city = new City;
    this.city.name = name;
    //this.city.weather = this.weatherService.create(name);
    return this.city;
  }

  public retrieve(): Promise<WeatherService> {
    return new Promise((resolve, reject) => {
      /*this.weatherService
        .retrieveByName(this.city.name)
        .then(() => resolve(this.city))
        .catch((error) => reject(error));*/
        resolve();
    });
  }

  public retrieveByCurrentPosition(): Promise<PositionService> {
    return new Promise((resolve, reject) => {

      /*this.positionService
        .retrieveByCoordinates(this.city)
        .then((position) => resolve(position)
          .retrieve())
        .catch((error) => reject(error));*/
        resolve();
    });
  }
}
