import { Injectable } from '@angular/core';
import { Weather } from '../models/weather'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(

    private weather: Weather

  ) {}

  public create(weather) {

    this.weather = new Weather;
    return this.weather;

  }

  public retrieveByName(name) {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest;

      xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='
        + name + '&APPID=e6bf7577fe8908916accd3e054fd6ace&lang=fr&units=metric');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.onload = () => {

        if (200 !== xhr.status) {

          return reject(xhr.status);

        }

        const json = JSON.parse(xhr.response);
        this.weather.currentTemp = json.main.temp;
        this.weather.description = json.weather[0].description;
        this.weather.humidity = json.main.humidity;
        this.weather.wind = json.wind.speed;
        this.weather.tempMin = json.main.temp_min;
        this.weather.tempMax = json.main.temp_max;

        return resolve(this.weather);

      }

      xhr.send();

    });

  }
}

