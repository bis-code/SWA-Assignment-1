import {WeatherData} from "./WeatherData.js";

export function Precipitation(value, type, unit, time, place, precipitation_type) {

    let weatherData = new WeatherData(value, type, unit, time, place);

    const getPrecipitationType = () => precipitation_type;

    const convertToInches = () => {
        if (weatherData.getUnit() !== 'in') {
            weatherData.setValue(weatherData.getValue() / 25.4);
            weatherData.setUnit('in');
        }
    }

    const convertToMM = () => {
        if (weatherData.getUnit() !== 'mm') {
            weatherData.setValue(weatherData.getValue() * 25.4);
            weatherData.setUnit('mm');
        }
    }

    return {
        ...weatherData,
        getPrecipitationType,
        convertToMM,
        convertToInches
    }
}