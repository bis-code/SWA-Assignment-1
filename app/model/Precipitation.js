import {createWheaterData} from "./WheaterData"
import {INCH_UNIT, INCH_TYPE, MM_TYPE, MM_UNIT} from "./Constants"
function createPrecipitation(type, unit, time, place) {

    let weatherData = createWheaterData(type, 'Precipitation', 'MM', time, place);
    let precipitation = Object.assign({}, weatherData);

    precipitation.convertToInches = () => {
        precipitation.setValue(precipitation.getValue()/25.4);
        precipitation.setType(INCH_TYPE);
        precipitation.setUnit(INCH_UNIT);
    }

    precipitation.convertToMM = () => {
        precipitation.setValue(precipitation.getValue()*25.4);
        precipitation.setType(MM_TYPE);
        precipitation.setUnit(MM_UNIT);
    }

    return precipitation;

}

module.exports = {
    createPrecipitation,
}