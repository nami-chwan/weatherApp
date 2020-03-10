import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { WeatherService } from './shared/services/weather.service';
import { PositionService } from './shared/services/position.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Weather } from './shared/models/weather';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private formBuilder: FormBuilder;
  private cityForm: FormGroup;
  private cityList: string[] = [];
  private weather: Weather;
  private messageError;

  constructor(

    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private positionService: PositionService,
    private weatherService: WeatherService
  ) {
    this.retry();
    this.weather = this.weatherService.getWeather();
    this.formBuilder = new FormBuilder;
    this.cityForm = this.formBuilder.group({
      city: ["", Validators.required]

    })

    this.initializeApp();

    this.positionService.getPositionByCoordinates()
      .then((position) => {
        this.weatherService.getWeatherByPosition(position)
          .then((weather) => {

            this.weatherService.setWeather(weather);
          })
          .catch((error) => {
            this.messageError = error;

          });
      })
      .catch((error) => {
        this.messageError = error;
      })

  }

  public retry() {
    this.positionService.getPositionByCoordinates();
    

  }

  public onCityClicked(city: string) {
    this.weatherService.getWeatherByName(city)
      .then((weather) => {
        this.weatherService.setWeather(weather);
      })
      .catch((error) => {
        this.messageError = error;
      })

  }

  public onDeleteCity(city) {
    const index = this.cityList.indexOf(city);
    if (index > -1) {
      this.cityList.splice(index, 1);
    }

  }

  public getCity() {
    this.weatherService.getWeatherByName(this.cityForm.value.city)
      .then((weather) => {
        if (this.cityList.indexOf(weather.cityName) == -1) {
          this.cityList.push(weather.cityName);
          this.weatherService.setWeather(weather);
        }

      })
      .catch((error) => {
        this.messageError = error;
      })
      .finally(() => {
        this.cityForm.reset();

      })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
