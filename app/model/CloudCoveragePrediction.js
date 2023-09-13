const {createWheaterData} = require("./WheaterData");
const {createWeatherPrediction} = require("./WeatherPrediction");

function createCloudCoveragePrediction(value, type, unit, time, place) {
    let weatherPrediction = createWeatherPrediction(value, type, unit);

    let cloudCoveragePrediction = Object.assign({}, weatherPrediction);

    return cloudCoveragePrediction;
}

module.exports = {
    createCloudCoveragePrediction
}