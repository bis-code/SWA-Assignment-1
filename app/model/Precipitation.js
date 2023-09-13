import {createWheaterData} from "./WheaterData"
import {INCH_UNIT, MM_UNIT} from "./constants/Constants"

function createPrecipitation(value, type, unit, time, place) {

    let weatherData = createWheaterData(value, type, unit, time, place);
    let precipitation = Object.assign({}, weatherData);

    precipitation.convertToInches = () => {
        if (precipitation.getUnit() !== INCH_UNIT) {
            precipitation.setValue(precipitation.getValue() / 25.4);
            precipitation.setUnit(INCH_UNIT);
        }
    }

    precipitation.convertToMM = () => {
        if (precipitation.getUnit() !== MM_UNIT) {
            precipitation.setValue(precipitation.getValue() * 25.4);
            precipitation.setUnit(MM_UNIT);
        }
    }

    return precipitation;

}

module.exports = {
    createPrecipitation,
}