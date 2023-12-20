import { WeatherData } from "./WeatherData.js";

export function Temperature(value, type, unit, time, place) {
    WeatherData.call(this, value, type, unit, time, place);
}

Temperature.prototype = Object.create(WeatherData.prototype);
Temperature.prototype.constructor = Temperature;

Temperature.prototype.convertToF = function() {
    if (this.getUnit() !== 'F') {
        this.setValue((this.getValue() * 9 / 5) + 32);
        this.setUnit('F');
    }
};

Temperature.prototype.convertToC = function() {
    if (this.getUnit() !== 'C') {
        this.setValue((this.getValue() - 32) * 5 / 9);
        this.setUnit('C');
    }
};