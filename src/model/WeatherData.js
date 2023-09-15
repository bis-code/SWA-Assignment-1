import {Event} from "./Event.js";
export function WeatherData(value, type, unit, time, place) {
    let event = new Event(time, place);

    const getValue = function () {
        return value;
    };

    const getType = function () {
        return type;
    };

    const getUnit = function () {
        return unit;
    };

    const setValue = function (_value) {
        value = _value;
    }

    const setType = function (_type) {
        type = _type;
    }

    const setUnit = function (_unit) {
        unit = _unit;
    }

    return {
        ...event,
        getValue,
        setValue,
        getType,
        setType,
        getUnit,
        setUnit
    };

}