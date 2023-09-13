import {createWheaterData} from "./WheaterData"
import {CELSIUS_UNIT, FAHRENHEIT_UNIT} from "./constants/Constants"

function createTemperature(value, type, unit, time, place) {
    let weatherData = createWheaterData(value, type, unit, time, place);

    let temperature = Object.assign({}, weatherData);

    temperature.convertToF = () => {
        if (temperature.getUnit() !== FAHRENHEIT_UNIT) {
            temperature.setValue((temperature.getValue() * 9 / 5) + 32);
            temperature.setUnit(FAHRENHEIT_UNIT);
        }
    }

    temperature.convertToC = () => {
        if (temperature.getUnit() !== CELSIUS_UNIT) {
            temperature.setValue((temperature.getValue() - 32) * 5 / 9);
            temperature.setUnit(CELSIUS_UNIT);
        }
    }

    return temperature;
}

module.exports = {
    createTemperature,
}