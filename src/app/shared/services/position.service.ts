import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
  ) { }

  public retrieveByCoordinates() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => { resolve(position) },
        (error) => { reject(error) }
      );
    });
  }

}
