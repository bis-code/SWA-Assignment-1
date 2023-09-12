import {createWheaterData} from "./WheaterData"
import {createEvent} from "./Event"

function createTemperature(temp, time, place){
    let weatherData = createWheaterData(temp, 'Temperature', '°C', time, place);

    let temperature = Object.assign({}, weatherData);
    
    temperature.convertToF = () => {
        if(temperature.getUnit() !== 'F') {
            temperature.setValue((temperature.getValue() * 9/5) + 32);
        }
    }

    temperature.convertToC = () => {
        if(temperature.getUnit() !== 'C') {
            temperature.setValue((temperature.getValue() - 32) * 5/9);
        }
    }

    return temperature;
}

module.exports = {
    createTemperature,
}