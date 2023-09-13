const {createWheaterData, WeatherData} = require("./WheaterData");

function createCloudCoverage(value, type, unit, time, place) {
    let weatherData = new WeatherData(value, type, unit, time, place);

    return {
        ...weatherData
    };
}

module.exports = {
    CloudCoverage : createCloudCoverage
}