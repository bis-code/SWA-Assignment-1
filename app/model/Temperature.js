import {createWheaterData} from "./WheaterData"
import {createEvent} from "./Event"

function createTemperature(temp, time, place){
    let temperature = Object.create(createWheaterData(temp, 'Temperature', '°C', time, place));

    temperature.convertToF = function () {

        temperature = FA
    };

    temperature.convertToC = function () {
        return this.getValue();
    };

    return temperature;
}

module.exports = {
    createTemperature,
}