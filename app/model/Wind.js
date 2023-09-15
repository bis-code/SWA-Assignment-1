const {WeatherData} = require("./WheaterData");
const {MPH_UNIT, MPS_UNIT} = require("./constants/Constants");

function createWind(value, type, unit, time, place, direction) {

    let weatherData = new WeatherData(value, type, unit, time, place);

    const getDirection = function () {
        return direction;
    }

    const setDirection = function (_direction) {
        direction = _direction;
    }

    const convertToMPH = () => {
        if (weatherData.getUnit() !== MPH_UNIT) {
            weatherData.setValue(weatherData.getValue() * 2.237);
            weatherData.setUnit(MPH_UNIT);
        }
    }

    const convertToMPS = () => {
        if (weatherData.getUnit() !== MPS_UNIT) {
            weatherData.setValue(weatherData.getValue() / 2.237);
            weatherData.setUnit(MPS_UNIT);
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