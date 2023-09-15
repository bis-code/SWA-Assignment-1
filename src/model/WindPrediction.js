import {WeatherPrediction} from "./WeatherPrediction.js";

export function WindPrediction(from, to, type, unit, time, place, direction) {
    let weatherPrediction = new WeatherPrediction(from, to, type, unit, time, place);

    const getExpectedDirections = () => direction;

    const matches = (data) => weatherPrediction.matches(data);

    const convertToMPH = () => {
        if (weatherPrediction.getUnit() !== 'm/h') {
            weatherPrediction.setFrom(weatherPrediction.getFrom() * 2.237);
            weatherPrediction.setTo(weatherPrediction.getTo() * 2.237);
            weatherPrediction.setUnit('m/h');
        }
    }

    const convertToMPS = () => {
        if (weatherPrediction.getUnit() !== 'm/s') {
            weatherPrediction.setFrom(weatherPrediction.getFrom() / 2.237);
            weatherPrediction.setTo(weatherPrediction.getTo() / 2.237);
            weatherPrediction.setUnit('m/s');
        }
    }

    return {
        ...weatherPrediction,
        getExpectedDirections,
        matches,
        convertToMPH,
        convertToMPS
    };
}