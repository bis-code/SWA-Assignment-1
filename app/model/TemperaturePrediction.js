const {createWeatherPrediction, WeatherPrediction} = require("./WeatherPrediction");
const {CELSIUS_TYPE, CELSIUS_UNIT, FAHRENHEIT_TYPE, FAHRENHEIT_UNIT} = require("./constants/Constants");

function TemperaturePrediction(value, type, unit, time, place) {
    let weatherPrediction = new WeatherPrediction(value, type, unit, time, place);

    const convertToF = () => {
        if (weatherPrediction.getUnit() !== FAHRENHEIT_UNIT) {
            weatherPrediction.setValue((weatherPrediction.getValue() * 9 / 5) + 32);
            weatherPrediction.setUnit(FAHRENHEIT_UNIT);
        }
    }

    const convertToC = () => {
        if (weatherPrediction.getUnit() !== CELSIUS_UNIT) {
            weatherPrediction.setValue((weatherPrediction.getValue() - 32) * 5 / 9);
            weatherPrediction.setUnit(CELSIUS_UNIT);
        }
    }

    return {
      ...weatherPrediction,
      convertToF,
      convertToC
    };
}

module.exports = {
    TemperaturePrediction,
}