import {createWheaterData} from "./WheaterData"
import {INCH_UNIT, INCH_TYPE, MM_TYPE, MM_UNIT} from "./constants/Constants"

function createPrecipitation(value, type, unit, time, place) {

    let weatherData = createWheaterData(value, type, unit, time, place);
    let precipitation = Object.assign({}, weatherData);

    precipitation.convertToInches = () => {
        if (precipitation.getType() !== INCH_TYPE) {
            precipitation.setValue(precipitation.getValue() / 25.4);
            precipitation.setType(INCH_TYPE);
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