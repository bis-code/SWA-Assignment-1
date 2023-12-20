import { Event } from "./Event.js";

export function WeatherData(value, type, unit, time, place) {
    this._value = value;
    this._type = type;
    this._unit = unit;

    Event.call(this, time, place);
}

WeatherData.prototype = Object.create(Event.prototype);
WeatherData.prototype.constructor = Event;

WeatherData.prototype.getValue = function() {
    return this._value;
};

WeatherData.prototype.getType = function() {
    return this._type;
};

WeatherData.prototype.getUnit = function() {
    return this._unit;
};

WeatherData.prototype.setValue = function(newValue) {
    this._value = newValue;
};

WeatherData.prototype.setType = function(newType) {
    this._type = newType;
};

WeatherData.prototype.setUnit = function(newUnit) {
    this._unit = newUnit;
};

WeatherData.prototype.toString = function() {
    return `${this._type} ${this._value} ${this._unit}`;
};
