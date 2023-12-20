import { WeatherPrediction } from "./WeatherPrediction.js";

export function WindPrediction(from, to, type, unit, time, place, directions) {
    WeatherPrediction.call(this, from, to, type, unit, time, place);
    this.directions = directions;
}

WindPrediction.prototype.getExpectedDirections = function() {
    return this.directions;
};

WindPrediction.prototype.convertToMPH = function() {
    if (this.getUnit() !== 'm/h') {
        this.setFrom(this.getFrom() * 2.237);
        this.setTo(this.getTo() * 2.237);
        this.setUnit('m/h');
    }
};

WindPrediction.prototype.convertToMPS = function() {
    if (this.getUnit() !== 'm/s') {
        this.setFrom(this.getFrom() / 2.237);
        this.setTo(this.getTo() / 2.237);
        this.setUnit('m/s');
    }
};
