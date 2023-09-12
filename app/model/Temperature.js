import {createWheaterData} from "./WheaterData"
import {CELSIUS_TYPE, CELSIUS_UNIT, FAHRENHEIT_UNIT, FAHRENHEIT_TYPE} from "./Constants"

function createTemperature(temp, time, place){
    let weatherData = createWheaterData(temp, 'Temperature', '°C', time, place);

    let temperature = Object.assign({}, weatherData);
    
    temperature.convertToF = () => {
        temperature.setValue((temperature.getValue() * 9/5) + 32);
        temperature.setType(FAHRENHEIT_TYPE);
        temperature.setUnit(FAHRENHEIT_UNIT);
    }

    temperature.convertToC = () => {
        temperature.setValue((temperature.getValue() - 32) * 5/9);
        temperature.setType(CELSIUS_TYPE);
        temperature.setUnit(CELSIUS_UNIT);
    }

    return temperature;
}

module.exports = {
    createTemperature,
}