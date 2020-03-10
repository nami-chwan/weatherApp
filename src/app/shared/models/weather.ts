export class Weather {
    
    description: string;
    currentTemp: string;
    humidity: string;
    wind: string;
    tempMin: string;
    tempMax: string;
    cityName: string;
    icon: string;

    constructor() {
        this.icon = "";
        this.description = "";
        this.currentTemp = "";
        this.humidity = "";
        this.wind = "";
        this.tempMin = "";
        this.tempMax = "";
        this.cityName = "";
    }

}