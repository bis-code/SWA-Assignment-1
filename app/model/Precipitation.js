const {WeatherData} = require("./WheaterData");
const {INCH_UNIT, INCH_TYPE, MM_TYPE, MM_UNIT} = require("./constants/Constants");

function Precipitation(value, type, unit, time, place, precipitation_type) {

    let weatherData = new WeatherData(value, type, unit, time, place);

    const getPrecipitationType = () => precipitation_type;

    const convertToInches = () => {
        if (weatherData.getUnit() !== INCH_UNIT) {
            weatherData.setValue(weatherData.getValue() / 25.4);
            weatherData.setUnit(INCH_UNIT);
        }
    }

    const convertToMM = () => {
        if (weatherData.getUnit() !== MM_UNIT) {
            weatherData.setValue(weatherData.getValue() * 25.4);
            weatherData.setUnit(MM_UNIT);
        }
    }

    return {
        ...weatherData,
        getPrecipitationType,
        convertToMM,
        convertToInches
    }
}

module.exports = {
    Precipitation,
}