const {WeatherData} = require("./WheaterData");
const {CELSIUS_TYPE, CELSIUS_UNIT, FAHRENHEIT_UNIT, FAHRENHEIT_TYPE} = require("./constants/Constants");

function createTemperature(value, type, unit, time, place) {
    let weatherData = new WeatherData(value, type, unit, time, place);

    const convertToF = () => {
        if (weatherData.getUnit() !== FAHRENHEIT_UNIT) {
            weatherData.setValue((weatherData.getValue() * 9 / 5) + 32);
            weatherData.setUnit(FAHRENHEIT_UNIT);
        }
    }

    const convertToC = () => {
        if (weatherData.getUnit() !== CELSIUS_UNIT) {
            weatherData.setValue((weatherData.getValue() - 32) * 5 / 9);
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