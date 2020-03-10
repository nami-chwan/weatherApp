import { Injectable } from '@angular/core';
import { Weather } from '../models/weather';
import { Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weather: Weather;
  private weatherAvailable: boolean;

  constructor() {
    this.weather = new Weather;
    this.weatherAvailable = false;
  }

  public getWeatherByName(name: string): Promise<Weather> {

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest;

      xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='
        + name + '&APPID=e6bf7577fe8908916accd3e054fd6ace&lang=fr&units=metric');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status !== 200) {
          reject(xhr.status);
        }
        else if (xhr.readyState == 4 && xhr.status == 200) {
          const json = JSON.parse(xhr.response);
          const weather = this.convertJsonToWeather(json);

          resolve(weather);
        }
      }

      xhr.send();
    });

  }

  public getWeather() {
    return this.weather;
  }

  public setWeather(weather: Weather) {
    if (weather.currentTemp == undefined) {
      this.weatherAvailable = false;
    }
    else {
      this.weatherAvailable = true;
    }

    this.weather.icon = weather.icon;
    this.weather.cityName = weather.cityName;
    this.weather.currentTemp = weather.currentTemp;
    this.weather.description = weather.description;
    this.weather.humidity = weather.humidity;
    this.weather.tempMax = weather.tempMax;
    this.weather.tempMin = weather.tempMin;
    this.weather.wind = weather.wind;
  }

  public getWeatherAvailability(): boolean {
    return this.weatherAvailable;
  }

  public getWeatherByPosition(position: Geoposition): Promise<Weather> {

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest;

      xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude +
        '&lon=' + position.coords.longitude + '&appid=e6bf7577fe8908916accd3e054fd6ace&lang=fr&units=metric');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.onreadystatechange = () => {

        if (xhr.readyState == 4 && xhr.status !== 200) {
          reject(xhr.status);
        }
        else if (xhr.readyState == 4 && xhr.status == 200) {
          const json = JSON.parse(xhr.response);
          const weather = this.convertJsonToWeather(json);

          resolve(weather);
        }
      }
      xhr.send();
    });

  }

  private convertJsonToWeather(json): Weather {
    const weather = new Weather;
    weather.icon = json.weather[0].icon;
    weather.description = json.weather[0].description;
    weather.currentTemp = json.main.temp;
    weather.humidity = json.main.humidity;
    weather.wind = json.wind.speed;
    weather.tempMin = json.main.temp_min;
    weather.tempMax = json.main.temp_max;
    weather.cityName = json.name;
    return weather;
  }

}

