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
        if (wind.getUnit() !== MPH_UNIT) {
            wind.setValue(wind.getValue() * 2.237);
            wind.setUnit(MPH_UNIT);
            wind.setDirection(DIRECTION);
        }
    }

    const convertToMPS = () => {
        if (wind.getUnit() !== MPS_UNIT) {
            wind.setValue(wind.getValue() / 2.237);
            wind.setUnit(MPS_UNIT);
            wind.setDirection(DIRECTION);
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