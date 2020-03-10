import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private geolocation: Geolocation
  ) { }

  public getPositionByCoordinates(): Promise<Geoposition> {
    return new Promise((resolve, reject) => {

      this.geolocation.getCurrentPosition()
        .then((position) => {
          resolve(position);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}
