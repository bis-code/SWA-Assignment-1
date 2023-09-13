const {createWheaterData, WeatherData} = require("./WheaterData");
const {MPH_TYPE, MPH_UNIT, MPS_TYPE, DIRECTION} = require("./constants/Constants");

function createWind(value, type, unit, time, place, direction) {

    let weatherData = new WeatherData(value, type, unit, time, place);

    const getDirection = function () {
        return direction;
    }

    const setDirection = function (_direction) {
        direction = _direction;
    }

    const convertToMPH = () => {
        if (weatherData.getType() !== MPH_TYPE) {
            weatherData.setValue(weatherData.getValue() * 2.237);
            weatherData.setType(MPH_TYPE);
            weatherData.setUnit(MPH_UNIT);
        }
    }

    const convertToMPS = () => {
        if (weatherData.getType() !== MPS_TYPE) {
            weatherData.setValue(weatherData.getValue() / 2.237);
            weatherData.setType(MPS_TYPE);
            weatherData.setUnit(MPH_UNIT);
        }
    }

    return {
        ...weatherData,
        convertToMPH,
        convertToMPS,
        getDirection,
        setDirection
    }
}

module.exports = {
    Wind : createWind,
}