const {createWheaterData} = require("./WheaterData");
const {INCH_UNIT, INCH_TYPE, MM_TYPE, MM_UNIT} = require("./constants/Constants");

function createPrecipitation(value, type, unit, time, place, precipitation_type) {

    let weatherData = createWheaterData(value, type, unit, time, place);
    let precipitation = Object.assign({}, weatherData);

    precipitation.precipitation_type = precipitation_type;

    precipitation.convertToInches = () => {
        if (precipitation.getType() !== INCH_TYPE) {
            precipitation.setValue(precipitation.getValue() / 25.4);
            precipitation.setUnit(INCH_UNIT);
        }
    }

    precipitation.convertToMM = () => {
        if (precipitation.getType() !== MM_TYPE) {
            precipitation.setValue(precipitation.getValue() * 25.4);
            precipitation.setType(MM_TYPE);
            precipitation.setUnit(MM_UNIT);
        }
    }

    return precipitation;

}

module.exports = {
    createPrecipitation,
}