import { Event } from "./Event.js";

export function WeatherPrediction(from, to, type, unit, time, place) {
   Event.call(this, time, place);

    this.from = from;
    this.to = to;
    this.type = type;
    this.unit = unit;
}

WeatherPrediction.prototype = Object.create(Event.prototype);
WeatherPrediction.prototype.constructor = WeatherPrediction;

WeatherPrediction.prototype.getFrom = function() {
    return this.from;
};

WeatherPrediction.prototype.getTo = function() {
    return this.to;
};

WeatherPrediction.prototype.setFrom = function(newFrom) {
    this.from = newFrom;
};

WeatherPrediction.prototype.setTo = function(newTo) {
    this.to = newTo;
};

WeatherPrediction.prototype.setUnit = function(newUnit) {
    this.unit = newUnit;
};

WeatherPrediction.prototype.getType = function() {
    return this.type;
};

WeatherPrediction.prototype.getUnit = function() {
    return this.unit;
};

WeatherPrediction.prototype.toString = function() {
    return `${this.type} between ${this.from}${this.unit} and ${this.to}${this.unit} at ${this.time}`;
};
