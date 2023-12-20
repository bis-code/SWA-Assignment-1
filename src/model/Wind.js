import {WeatherData} from "./WeatherData.js";

export function Wind(value, type, unit, time, place, direction) {
    WeatherData.call(this, value, type, unit, time, place);
    this.direction = direction;
}

Wind.prototype = Object.create(WeatherData.prototype);
Wind.prototype.constructor = Wind;

Wind.prototype.getDirection = function () {
    return this.direction;
}

Wind.prototype.setDirection = function (newDirection) {
    this.direction = newDirection;
}

Wind.prototype.convertToMPH = function () {
    if (this.getUnit() !== 'm/h') {
        this.setValue(this.getValue() * 2.237);
        this.setUnit('m/h');
    }
}

Wind.prototype.convertToMPS = function () {
    if (this.getUnit() !== 'm/s') {
        this.setValue(this.getValue() / 2.237);
        this.setUnit('m/s');
    }
}
