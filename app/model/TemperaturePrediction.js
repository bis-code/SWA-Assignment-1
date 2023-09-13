import {createWeatherPrediction} from "./WeatherPrediction";
import {CELSIUS_TYPE, CELSIUS_UNIT, FAHRENHEIT_TYPE, FAHRENHEIT_UNIT} from "./constants/Constants";

function createTemperaturePrediction(value, type, unit, time, place) {
    let weatherPrediction = createWeatherPrediction(value, type, unit, time, place);

    let temperaturePrediction = Object.assign({}, weatherPrediction);

    temperaturePrediction.convertToF = () => {
        if(temperaturePrediction.getUnit() !== 'F') {
            temperaturePrediction.setValue((temperaturePrediction.getValue() * 9/5) + 32);
            temperaturePrediction.setType(FAHRENHEIT_TYPE);
            temperaturePrediction.setUnit(FAHRENHEIT_UNIT);
        }
    }

    temperaturePrediction.convertToC = () => {
        if(temperaturePrediction.getUnit() !== 'C') {
            temperaturePrediction.setValue((temperaturePrediction.getValue() - 32) * 5/9);
            temperaturePrediction.setType(CELSIUS_TYPE);
            temperaturePrediction.setUnit(CELSIUS_UNIT);
        }
    }
}

module.exports = {
    createTemperaturePrediction
}