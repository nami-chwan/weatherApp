import { Injectable } from '@angular/core';
import { WeatherService } from './weather.service';
import { PositionService } from './position.service';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  positionService: PositionService;
  weatherService: WeatherService;
  city: City;

  constructor(
  ) {

    this.positionService = new PositionService;
    this.weatherService = new WeatherService;
    this.create("");
  }

  public create(name) {
    this.city = new City;
    this.city.name = name;
    this.city.weather = this.weatherService.create();
    console.log('create');
    
    return this.city;

  }

  public retrieve() {
    return new Promise((resolve, reject) => {
      this.weatherService
        .retrieveByName(this.city.name)
        .then(() => resolve(this.city))
        .catch(error => reject(error));
        console.log('retrieve');
        
    });

  }

  // public retrieveByCurrentPosition() {
  //   return new Promise((resolve, reject) => {

  //     this.positionService
  //       .retrieveByCoordinates(this.city)
  //       .then((position) => resolve(position)
  //         .retrieve())
  //       .catch((error) => reject(error));
  //   });

  // }
}
