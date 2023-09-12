import {createEvent} from "./Event"

function createWheaterData(value, type, unit, time, place){

    let weatherData = Object.create(createEvent(time, place));

    weatherData.value = value;
    weatherData.type = type;
    weatherData.unit = unit;

    weatherData.getValue = function () {
        return this.value;
    };

    weatherData.getType = function () {
        return this.type;
    };

    weatherData.getUnit = function () {
        return this.unit;
    };

    weatherData.setValue = function (_value){
        this.value = _value;
    }

    weatherData.setType = function (_type){
        this.type = _type;
    }

    weatherData.setUnit = function (_unit){
        this.unit = _unit;
    }

    return weatherData;

}

module.exports = {
    createWheaterData
}