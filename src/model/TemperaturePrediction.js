import { WeatherPrediction } from "./WeatherPrediction.js";

export function TemperaturePrediction(from, to, type, unit, time, place) {
    WeatherPrediction.call(this, from, to, type, unit, time, place);
}

TemperaturePrediction.prototype = Object.create(WeatherPrediction.prototype);
TemperaturePrediction.prototype.constructor = TemperaturePrediction;

TemperaturePrediction.prototype.convertToF = function() {
    if (this.getUnit() !== 'F') {
        this.setFrom((this.getFrom() * 9 / 5) + 32);
        this.setTo((this.getTo() * 9 / 5) + 32);
        this.setUnit('F');
    }
};

TemperaturePrediction.prototype.convertToC = function() {
    if (this.getUnit() !== 'C') {
        this.setFrom((this.getFrom() - 32) * 5 / 9);
        this.setTo((this.getTo() - 32) * 5 / 9);
        this.setUnit('C');
    }
};
