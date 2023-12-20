import {WeatherData} from "./WeatherData.js";

export function Precipitation(value, type, unit, time, place, precipitation_type) {
    WeatherData.call(this, value, type, unit, time, place);
    this.precipitation_type = precipitation_type;
}

Precipitation.prototype = Object.create(WeatherData.prototype);
Precipitation.prototype.constructor = Precipitation;

Precipitation.prototype.getPrecipitationType = function () {
    return this.precipitation_type;
};

Precipitation.prototype.convertToInches = function () {
    if (this.getUnit() !== 'in') {
        this.setValue(this.getValue() / 25.4);
        this.setUnit('in');
    }
};

Precipitation.prototype.convertToMM = function () {
    if (this.getUnit() !== 'mm') {
        this.setValue(this.getValue() * 25.4);
        this.setUnit('mm');
    }
};
