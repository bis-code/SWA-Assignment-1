import {createWeatherPrediction, WeatherPrediction} from "./WeatherPrediction";
import {INCH_UNIT, MM_UNIT} from "./constants/Constants";

function createPrecipitationPrediction(value, type, unit, time, place, precipitation_type) {
    let weatherPrediction = new WeatherPrediction(value, type, unit, time, place);

    const getPrecipitationType = () => precipitation_type;

    const matches = (data) => {
        return weatherPrediction.getValue() === data.getValue()
            && weatherPrediction.getType() === data.getType()
            && weatherPrediction.getUnit() === data.getUnit()
            && weatherPrediction.getTime() === data.getTime()
            && weatherPrediction.getPlace() === data.getPlace();
    }

    const convertToInches = () => {
        if (weatherPrediction.getUnit() !== INCH_UNIT) {
            weatherPrediction.setValue(weatherPrediction.getValue() / 25.4);
            weatherPrediction.setUnit(INCH_UNIT);
        }
    }

    const convertToMM = () => {
        if (weatherPrediction.getUnit() !== MM_UNIT) {
            weatherPrediction.setValue(weatherPrediction.getValue() * 25.4);
            weatherPrediction.setUnit(MM_UNIT);
        }
    }

    return {
        ...weatherPrediction,
        matches,
        getPrecipitationType,
        convertToMM,
        convertToInches
    }
}

module.exports = {
    PrecipitationPrediction : createPrecipitationPrediction
}