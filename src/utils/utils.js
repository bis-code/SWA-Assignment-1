import {CloudCoverage} from "../model/CloudCoverage.js";
import {Precipitation} from "../model/Precipitation.js";
import {Wind} from "../model/Wind.js";
import {Temperature} from "../model/Temperature.js";

export function deserializedData(jsonData) {
    console.log(jsonData);
    const deserializedData = jsonData.map(item => {
        try {
            switch (item.type) {
                case 'temperature': {
                    return new Temperature(item.value, item.type, item.unit, new Date(item.time), item.place);
                }
                case 'precipitation': {
                    return new Precipitation(item.value, item.type, item.unit, new Date(item.time), item.place, item.precipitation_type);
                }
                case 'wind speed': {
                    return new Wind(item.value, item.type, item.unit, new Date(item.time), item.place, item.direction);
                }
                case 'cloud coverage': {
                    return new CloudCoverage(item.value, item.type, item.unit, new Date(item.time), item.place);
                }
                default:
                    return null;
            }
        } catch (error) {
            console.error(`Error creating object for item: ${JSON.stringify(item)}`, error);
            return null;
        }
    });
    return deserializedData.filter(item => item !== null);
}

export function deserializedDataPrediction(jsonData) {
    const deserializedDataPrediction = jsonData.map(item => {
        try {
            switch (item.type) {
                case 'temperature': {
                    return new TemperaturePrediction(item.value, item.type, item.unit, new Date(item.time), item.place);
                }
                case 'precipitation': {
                    return new PrecipitationPrediction(item.value, item.type, item.unit, new Date(item.time), item.place, item.precipitation_type);
                }
                case 'wind speed': {
                    return new WindPrediction(item.value, item.type, item.unit, new Date(item.time), item.place, item.direction);
                }
                case 'cloud coverage': {
                    return new CloudCoveragePrediction(item.value, item.type, item.unit, new Date(item.time), item.place);
                }
                default:
                    return null;
            }
        } catch (error) {
            console.error(`Error creating object for item: ${JSON.stringify(item)}`, error);
            return null;
        }
    });
    return deserializedDataPrediction.filter(item => item !== null);
}

