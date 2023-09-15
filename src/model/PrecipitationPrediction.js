import {WeatherPrediction} from "./WeatherPrediction.js";

export function PrecipitationPrediction(from, to, type, unit, time, place, precipitation_type) {
    let weatherPrediction = new WeatherPrediction(from, to, type, unit, time, place);

    const getPrecipitationType = () => precipitation_type;

    const matches = (data) => {
        return weatherPrediction.getFrom() === data.getFrom()
            && weatherPrediction.getTo() === data.getTo()
            && weatherPrediction.getType() === data.getType()
            && weatherPrediction.getUnit() === data.getUnit()
            && weatherPrediction.getTime() === data.getTime()
            && weatherPrediction.getPlace() === data.getPlace();
    }

    const convertToInches = () => {
        if (weatherPrediction.getUnit() !== 'in') {
            weatherPrediction.setFrom(weatherPrediction.getFrom() / 25.4);
            weatherPrediction.setTo(weatherPrediction.getTo() / 25.4);
            weatherPrediction.setUnit('in');
        }
    }

    const convertToMM = () => {
        if (weatherPrediction.getUnit() !== 'mm') {
            weatherPrediction.setFrom(weatherPrediction.getFrom() * 25.4);
            weatherPrediction.setTo(weatherPrediction.getTo() * 25.4);
            weatherPrediction.setUnit('mm');
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