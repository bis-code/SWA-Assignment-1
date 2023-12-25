import {WeatherData} from "./WeatherData.js";

// This follows factory function for object creation
// export function createPrecipitation(value, type, unit, time, place, precipitation_type) {
//     let precipitationObject = Object.create(WeatherData);
//     precipitationObject.value = value;
//     precipitationObject.type = type;
//     precipitationObject.unit = unit;
//     precipitationObject.time = time;
//     precipitationObject.place = place;
//     precipitationObject.precipitation_type = precipitation_type;
//
//     precipitationObject.getPrecipitationType = function () {
//         return this.precipitation_type;
//     };
//
//     precipitationObject.convertToInches = function () {
//         if (this.unit !== 'in') {
//             this.value = this.value / 25.4;
//             this.unit = 'in';
//         }
//     };
//
//     precipitationObject.convertToMM = function () {
//         if (this.unit !== 'mm') {
//             this.value = this.value * 25.4;
//             this.unit = 'mm';
//         }
//     };
//
//     return precipitationObject;
// }

// This follows constructor function
// binding with this
// export function Precipitation(value, type, unit, time, place, precipitation_type) {
//     WeatherData.call(this, value, type, unit, time, place);
//     this.precipitation_type = precipitation_type;
//
//     this.getPrecipitationType = this.getPrecipitationType.bind(this);
//     this.convertToInches = this.convertToInches.bind(this);
//     this.convertToMM = this.convertToMM.bind(this);
// }
//
// // prototype chain setup
// Precipitation.prototype = Object.create(WeatherData.prototype);
// Precipitation.prototype.constructor = Precipitation;
//
// // ensures that all instances of Precipitation.prototype have access to these methods
// Precipitation.prototype.getPrecipitationType = function () {
//     return this.precipitation_type;
// };
//
// Precipitation.prototype.convertToInches = function () {
//     if (this.getUnit() !== 'in') {
//         this.setValue(this.getValue() / 25.4);
//         this.setUnit('in');
//     }
// };
//
// Precipitation.prototype.convertToMM = function () {
//     if (this.getUnit() !== 'mm') {
//         this.setValue(this.getValue() * 25.4);
//         this.setUnit('mm');
//     }
// };

// example of using class
// export class Precipitation extends WeatherData {
//     constructor(value, type, unit, time, place, precipitation_type) {
//         super(value, type, unit, time, place);
//         this.precipitation_type = precipitation_type;
//     }
//
//     getPrecipitationType() {
//         return this.precipitation_type;
//     }
//
//     convertToInches() {
//         if (this.getUnit() !== 'in') {
//             this.setValue(this.getValue() / 25.4);
//             this.setUnit('in');
//         }
//     }
//
//     convertToMM() {
//         if (this.getUnit() !== 'mm') {
//             this.setValue(this.getValue() * 25.4);
//             this.setUnit('mm');
//         }
//     }
// }


export function Precipitation(value, type, unit, time, place, precipitation_type) {
    WeatherData.call(this, value, type, unit, time, place);
    this.precipitation_type = precipitation_type;
}

// prototype chain setup
Precipitation.prototype = Object.create(WeatherData.prototype);
Precipitation.prototype.constructor = Precipitation;

// ensures that all instances of Precipitation.prototype have access to these methods
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
