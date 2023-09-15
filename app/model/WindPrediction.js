const {createWeatherPrediction, WeatherPrediction} = require("./WeatherPrediction");
const {DIRECTION, MPH_TYPE, MPH_UNIT, MPS_TYPE} = require("./constants/Constants");

function createWindPrediction(value, type, unit, time, place, direction) {
    let weatherPrediction = new WeatherPrediction(value, type, unit, time, place);

    const getExpectedDirections = () => weatherPrediction.direction;

    const matches = (data) => weatherPrediction.matches(data);

    const convertToMPH = () => {
        weatherPrediction.setValue(weatherPrediction.getValue() * 2.237);
        weatherPrediction.setType(MPH_TYPE);
        weatherPrediction.setUnit(MPH_UNIT);
        weatherPrediction.setDirection(DIRECTION);
    }

    const convertToMPS = () => {
        weatherPrediction.setValue(weatherPrediction.getValue() / 2.237);
        weatherPrediction.setType(MPS_TYPE);
        weatherPrediction.setUnit(MPH_UNIT);
        weatherPrediction.setDirection(DIRECTION);
    }

    return {
        ...weatherPrediction,
        getExpectedDirections,
        matches,
        convertToMPH,
        convertToMPS
    };
}

module.exports = {
    WindPrediction: createWindPrediction,
}