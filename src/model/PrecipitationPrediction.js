import { WeatherPrediction } from "./WeatherPrediction.js";

export function PrecipitationPrediction(from, to, type, unit, time, place, precipitationType) {
    WeatherPrediction.call(this, from, to, type, unit, time, place);
    this.precipitationType = precipitationType;
}

PrecipitationPrediction.prototype = Object.create(WeatherPrediction.prototype);
PrecipitationPrediction.prototype.constructor = PrecipitationPrediction;

PrecipitationPrediction.prototype.matches = function(data) {
    return this.getFrom() === data.getFrom()
        && this.getTo() === data.getTo()
        && this.getType() === data.getType()
        && this.getUnit() === data.getUnit()
        && this.getTime() === data.getTime()
        && this.getPlace() === data.getPlace();
};

PrecipitationPrediction.prototype.getPrecipitationType = function() {
    return this.precipitationType;
};

PrecipitationPrediction.prototype.convertToInches = function() {
    if (this.getUnit() !== 'in') {
        this.setFrom(this.getFrom() / 25.4);
        this.setTo(this.getTo() / 25.4);
        this.setUnit('in');
    }
};

PrecipitationPrediction.prototype.convertToMM = function() {
    if (this.getUnit() !== 'mm') {
        this.setFrom(this.getFrom() * 25.4);
        this.setTo(this.getTo() * 25.4);
        this.setUnit('mm');
    }
};