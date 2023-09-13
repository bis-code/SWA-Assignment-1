import {createWheaterData} from "./WheaterData";
import {createEvent} from "./Event";

function createWeatherPrediction(value, type, unit, time, place) {
    let weatherData = createWheaterData(value, type, unit);
    let event = createEvent(time, place);

    let weatherPrediction = Object.assign({}, weatherData, event);

    weatherPrediction.getMax = (weatherPrediction_) => {
        return Math.max(weatherPrediction.getValue(), weatherPrediction_.getValue());
    }

    weatherPrediction.getMin = (weatherPrediction_) => {
        return Math.min(weatherPrediction.getValue(), weatherPrediction_.getValue());
    }

    weatherPrediction.getType = () => weatherPrediction.getType();
    weatherPrediction.getUnit = () => weatherPrediction.getUnit();

    return weatherPrediction;
}

module.exports = {
    createWeatherPrediction
}
