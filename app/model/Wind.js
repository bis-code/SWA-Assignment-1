import {createWheaterData} from "./WheaterData"
import {MPH_TYPE, MPH_UNIT, MPS_TYPE, DIRECTION} from "./Constants"

function createWind(unit, direction, type, time, place) {

    let weatherData = createWheaterData(type, 'Wind', 'MPS', time, place);

    let wind = Object.assign({}, weatherData);

    wind.direction = direction;

    wind.getDirection = function () {
        return this.direction;
    }

    wind.setDirection = function (_direction){
        this.direction = _direction;
    }

    wind.convertToMPH = () => {
        wind.setValue(wind.getValue()*2.237);
        wind.setType(MPH_TYPE);
        wind.setUnit(MPH_UNIT);
        wind.setDirection(DIRECTION);
    }

    wind.convertToMPS = () => {
        wind.setValue(wind.getValue()/2.237);
        wind.setType(MPS_TYPE);
        wind.setUnit(MPH_UNIT);
        wind.setDirection(DIRECTION);
    }

    return wind;
}

module.exports = {
    createWind,
}