import { WeatherPrediction } from "./WeatherPrediction.js";

export function CloudCoveragePrediction(from, to, type, unit, time, place) {
    WeatherPrediction.call(this, from, to, type, unit, time, place);
}

CloudCoveragePrediction.prototype = Object.create(WeatherPrediction.prototype);
CloudCoveragePrediction.prototype.constructor = CloudCoveragePrediction;