import {createWeatherPrediction} from "./WeatherPrediction";
import {DIRECTION, MPH_TYPE, MPH_UNIT, MPS_TYPE} from "./constants/Constants";

function createWindPrediction(value, type, unit, time, place, direction) {
    let weatherPrediction = createWeatherPrediction(value, type, unit, time, place);

    let windPrediction = Object.assign({}, weatherPrediction);
    windPrediction.direction = direction;

    windPrediction.getExpectedDirections = () => windPrediction.direction;

    windPrediction.matches = (data) => weatherPrediction.matches(data);

    windPrediction.convertToMPH = () => {
        windPrediction.setValue(windPrediction.getValue() * 2.237);
        windPrediction.setType(MPH_TYPE);
        windPrediction.setUnit(MPH_UNIT);
        windPrediction.setDirection(DIRECTION);
    }

    windPrediction.convertToMPS = () => {
        windPrediction.setValue(windPrediction.getValue() / 2.237);
        windPrediction.setType(MPS_TYPE);
        windPrediction.setUnit(MPH_UNIT);
        windPrediction.setDirection(DIRECTION);
    }
}

module.exports = {
    createWindPrediction,
}