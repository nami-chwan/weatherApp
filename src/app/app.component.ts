import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CityService } from './shared/services/city.service';
import { WeatherService } from './shared/services/weather.service';
import { PositionService } from './shared/services/position.service';
import { resolve } from 'url';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private positionService: PositionService,
    private weatherService: WeatherService,
    private menu : MenuController
  ) {

    this.positionService.retrieveByCoordinates()
      .then((position) => {
        this.weatherService.retrieveByPosition(position);
        resolve("", "");
      });
      
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
