import {createWeatherPrediction} from "./WeatherPrediction";
import {INCH_TYPE, INCH_UNIT, MM_TYPE, MM_UNIT} from "./constants/Constants";

function createPrecipitationPrediction(value, type, unit, time, place, precipitation_type) {
    let weatherPrediction = createWeatherPrediction(value, type, unit, time, place);

    let precipitationPrediction = Object.assign({}, weatherPrediction);

    precipitationPrediction.precipitation_type = precipitationPrediction;

    precipitationPrediction.getExpectedTypes = () => precipitationPrediction.precipitation_type;

    precipitationPrediction.matches = (data) => {
        return weatherPrediction.matches(data);
    }

    precipitationPrediction.convertToInches = () => {
        if (precipitationPrediction.getType() !== INCH_TYPE) {
            precipitationPrediction.setValue(precipitationPrediction.getValue() / 25.4);
            precipitationPrediction.setType(INCH_TYPE);
            precipitationPrediction.setUnit(INCH_UNIT);
        }
    }

    precipitationPrediction.convertToMM = () => {
        if (precipitationPrediction.getType() !== MM_TYPE) {
            precipitationPrediction.setValue(precipitationPrediction.getValue() * 25.4);
            precipitationPrediction.setType(MM_TYPE);
            precipitationPrediction.setUnit(MM_UNIT);
        }
    }
}

module.exports = {
    createPrecipitationPrediction
}