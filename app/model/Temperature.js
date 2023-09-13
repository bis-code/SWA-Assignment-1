import {createWheaterData} from "./WheaterData"
import {CELSIUS_TYPE, CELSIUS_UNIT, FAHRENHEIT_UNIT, FAHRENHEIT_TYPE} from "./constants/Constants"

function createTemperature(value, type, unit, time, place){
    let weatherData = createWheaterData(value, type, unit, time, place);

    let temperature = Object.assign({}, weatherData);
    
    temperature.convertToF = () => {
        if(temperature.getUnit() !== 'F') {
            temperature.setValue((temperature.getValue() * 9 / 5) + 32);
            temperature.setType(FAHRENHEIT_TYPE);
            temperature.setUnit(FAHRENHEIT_UNIT);
        }
    }

    temperature.convertToC = () => {
        if(temperaturePrediction.getUnit() !== 'C') {
            temperature.setValue((temperature.getValue() - 32) * 5 / 9);
            temperature.setType(CELSIUS_TYPE);
            temperature.setUnit(CELSIUS_UNIT);
        }
    }

    return temperature;
}

module.exports = {
    createTemperature,
}