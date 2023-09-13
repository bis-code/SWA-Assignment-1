const {createWheaterData} = require("./WheaterData");
const {Event} = require("./Event");

function createWeatherPrediction(value, type, unit, time, place) {
    let weatherData = createWheaterData(value, type, unit);
    let event = Event(time, place);

    let weatherPrediction = Object.assign({}, weatherData, event);

    weatherPrediction.matches = (data) => {
        return weatherPrediction.getValue() === data.getValue()
            && weatherPrediction.getType() === data.getType()
            && weatherPrediction.getUnit() === data.getUnit()
            && weatherPrediction.getTime() === data.getTime()
            && weatherPrediction.getPlace() === data.getPlace();
    }

    weatherPrediction.getMax = (weatherPrediction_) => {
        return Math.max(weatherPrediction.getValue(), weatherPrediction_.getValue());
    }

    weatherPrediction.getMin = (weatherPrediction_) => {
        return Math.min(weatherPrediction.getValue(), weatherPrediction_.getValue());
    }

    weatherPrediction.getType = () => weatherPrediction.getType();
    weatherPrediction.getUnit = () => weatherPrediction.getUnit();

    return weatherPrediction;
}

module.exports = {
    createWeatherPrediction
}
