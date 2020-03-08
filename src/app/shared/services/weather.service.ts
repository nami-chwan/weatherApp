import { Injectable } from '@angular/core';
import { Weather } from '../models/weather';
import { Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  weather: Weather;

  constructor() {
    this.weather = new Weather;
  }

  public retrieveByName(name): Promise<Weather> {

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
        this.convertJsonToWeather(json);

        return resolve(this.weather);
      }

      xhr.send();
    });
  }

  public retrieveByPosition(position: Geoposition): Promise<Weather> {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest;

      xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=e6bf7577fe8908916accd3e054fd6ace&lang=fr&units=metric');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.onload = () => {
        if (200 !== xhr.status) {
          return reject(xhr.status);
        }

        const json = JSON.parse(xhr.response);
        this.convertJsonToWeather(json);

        return resolve(this.weather);
      }

      xhr.send();
    });
  }

  private convertJsonToWeather(json) {
    this.weather.currentTemp = json.main.temp;
    this.weather.description = json.weather[0].description;
    this.weather.humidity = json.main.humidity;
    this.weather.wind = json.wind.speed;
    this.weather.tempMin = json.main.temp_min;
    this.weather.tempMax = json.main.temp_max;
    this.weather.cityName = json.name;

    console.log(this.weather);
  }
}

