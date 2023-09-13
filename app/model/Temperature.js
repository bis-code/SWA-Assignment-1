const {WeatherData} = require("./WheaterData");
const {CELSIUS_TYPE, CELSIUS_UNIT, FAHRENHEIT_UNIT, FAHRENHEIT_TYPE} = require("./constants/Constants");

function createTemperature(value, type, unit, time, place) {
    let weatherData = new WeatherData(value, type, unit, time, place);

    const convertToF = () => {
        if (weatherData.getType() !== FAHRENHEIT_TYPE) {
            weatherData.setValue((weatherData.getValue() * 9 / 5) + 32);
            weatherData.setType(FAHRENHEIT_TYPE);
            weatherData.setUnit(FAHRENHEIT_UNIT);
        }
    }

    const convertToC = () => {
        if (weatherData.getType() !== CELSIUS_TYPE) {
            weatherData.setValue((weatherData.getValue() - 32) * 5 / 9);
            weatherData.setType(CELSIUS_TYPE);
            weatherData.setUnit(CELSIUS_UNIT);
        }
    }

    return {
        ...weatherData,
        convertToF,
        convertToC,
    }
}

module.exports = {
    Temperature : createTemperature,
}