import {createWeatherPrediction} from "./WeatherPrediction";

function createTemperaturePrediction(time, place, value, type, unit) {
    let weatherPrediction = createWeatherPrediction(time, place, value, type, unit);

    let temperaturePrediction = Object.assign({}, weatherPrediction);

    temperaturePrediction.convertToF = () => {
        if(weatherPrediction.getUnit() !== 'F') {
            temperaturePrediction.setValue((temperaturePrediction.getValue() * 9/5) + 32);
        }
    }

    temperaturePrediction.convertToC = () => {
        if(weatherPrediction.getUnit() !== 'C') {
            temperaturePrediction.setValue((temperaturePrediction.getValue() - 32) * 5/9);
        }
    }
}

module.exports = {
    createTemperaturePrediction
}