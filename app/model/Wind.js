import {createWheaterData} from "./WheaterData"
import {MPH_UNIT, MPS_UNIT, DIRECTION} from "./constants/Constants"

function createWind(value, type, unit, time, place, direction) {

    let weatherData = createWheaterData(value, type, unit, time, place);

    let wind = Object.assign({}, weatherData);

    wind.direction = direction;

    wind.getDirection = function () {
        return this.direction;
    }

    wind.setDirection = function (_direction) {
        this.direction = _direction;
    }

    wind.convertToMPH = () => {
        if (wind.getUnit() !== MPH_UNIT) {
            wind.setValue(wind.getValue() * 2.237);
            wind.setUnit(MPH_UNIT);
            wind.setDirection(DIRECTION);
        }
    }

    wind.convertToMPS = () => {
        if (wind.getUnit() !== MPS_UNIT) {
            wind.setValue(wind.getValue() / 2.237);
            wind.setUnit(MPS_UNIT);
            wind.setDirection(DIRECTION);
        }
    }

    return wind;
}

module.exports = {
    createWind,
}