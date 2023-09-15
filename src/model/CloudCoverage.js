import {WeatherData} from "./WeatherData.js";

export function CloudCoverage(value, type, unit, time, place) {
    let weatherData = new WeatherData(value, type, unit, time, place);

    return {
        ...weatherData
    };
}