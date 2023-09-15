import {WeatherPrediction} from "./WeatherPrediction.js";

export function TemperaturePrediction(from, to, type, unit, time, place) {
    let weatherPrediction = new WeatherPrediction(from, to, type, unit, time, place);

    const convertToF = () => {
        if (weatherPrediction.getUnit() !== 'F') {
            weatherPrediction.setFrom((weatherPrediction.getFrom() * 9 / 5) + 32);
            weatherPrediction.setTo((weatherPrediction.getTo() * 9 / 5) + 32);
            weatherPrediction.setUnit('F');
        }
    }

    const convertToC = () => {
        if (weatherPrediction.getUnit() !== 'C') {
            weatherPrediction.setFrom((weatherPrediction.getFrom() - 32) * 5 / 9);
            weatherPrediction.setTo((weatherPrediction.getTo() - 32) * 5 / 9);
            weatherPrediction.setUnit('C');
        }
    }

    return {
        ...weatherPrediction,
        convertToF,
        convertToC
    };
}