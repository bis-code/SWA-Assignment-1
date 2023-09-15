import {WeatherPrediction} from "./WeatherPrediction.js";

export function CloudCoveragePrediction(from, to, type, unit, time, place) {
    let weatherPrediction = new WeatherPrediction(from, to, type, unit, time, place);
    return {
        ...weatherPrediction
    };
}
