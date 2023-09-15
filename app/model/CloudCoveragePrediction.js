const {createWheaterData} = require("./WheaterData");
const {createWeatherPrediction} = require("./WeatherPrediction");

function createCloudCoveragePrediction(value, type, unit, time, place) {
    let weatherPrediction = createWeatherPrediction(value, type, unit);
    return {
        ...weatherPrediction
    };
}

module.exports = {
    CloudCoveragePrediction : createCloudCoveragePrediction
}