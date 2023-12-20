import { WeatherData } from "./WeatherData.js";

export function CloudCoverage(value, type, unit, time, place) {
    WeatherData.call(this, value, type, unit, time, place);
}

CloudCoverage.prototype = Object.create(WeatherData.prototype);
CloudCoverage.prototype.constructor = CloudCoverage;
