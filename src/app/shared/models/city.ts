import { Weather } from './weather';

export class City {

    name: string;
    dayTime: string;
    weather: Weather;

    constructor(

    ) {
        
        this.name = "";
        this.dayTime = "";
        this.weather = new Weather();
    }

}
