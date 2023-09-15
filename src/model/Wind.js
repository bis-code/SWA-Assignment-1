import {WeatherData} from "./WeatherData.js";

export function Wind(value, type, unit, time, place, direction) {

    let weatherData = new WeatherData(value, type, unit, time, place);

    const getDirection = function () {
        return direction;
    }

    const setDirection = function (_direction) {
        direction = _direction;
    }

    const convertToMPH = () => {
        if (weatherData.getUnit() !== 'm/h') {
            weatherData.setValue(weatherData.getValue() * 2.237);
            weatherData.setUnit('m/h');
        }
    }

    const convertToMPS = () => {
        if (weatherData.getUnit() !== 'm/s') {
            weatherData.setValue(weatherData.getValue() / 2.237);
            weatherData.setUnit('m/s');
        }
    }

    return {
        ...weatherData,
        convertToMPH,
        convertToMPS,
        getDirection,
        setDirection
    }
}