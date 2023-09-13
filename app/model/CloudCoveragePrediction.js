import {createWheaterData} from "./WheaterData"
import {createWeatherPrediction} from "./WeatherPrediction";

function createCloudCoveragePrediction(value, type, unit, time, place) {
    let weatherPrediction = createWeatherPrediction(value, type, unit);

    let cloudCoveragePrediction = Object.assign({}, wheaterData);

    return cloudCoveragePrediction;
}

module.exports = {
    createCloudCoveragePrediction
}