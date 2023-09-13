const {createWeatherPrediction} = require("./WeatherPrediction");
const {CELSIUS_TYPE, CELSIUS_UNIT, FAHRENHEIT_TYPE, FAHRENHEIT_UNIT} = require("./constants/Constants");

function createTemperaturePrediction(value, type, unit, time, place) {
    let weatherPrediction = createWeatherPrediction(value, type, unit, time, place);

    let temperaturePrediction = Object.assign({}, weatherPrediction);

    temperaturePrediction.convertToF = () => {
        if (temperaturePrediction.getType() !== FAHRENHEIT_TYPE) {
            temperaturePrediction.setValue((temperaturePrediction.getValue() * 9 / 5) + 32);
            temperaturePrediction.setType(FAHRENHEIT_TYPE);
            temperaturePrediction.setUnit(FAHRENHEIT_UNIT);
        }
    }

    temperaturePrediction.convertToC = () => {
        if (temperaturePrediction.getType() !== CELSIUS_TYPE) {
            temperaturePrediction.setValue((temperaturePrediction.getValue() - 32) * 5 / 9);
            temperaturePrediction.setType(CELSIUS_TYPE);
            temperaturePrediction.setUnit(CELSIUS_UNIT);
        }
    }
}

module.exports = {
    createTemperaturePrediction
}