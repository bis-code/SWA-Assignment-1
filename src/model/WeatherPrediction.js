import { WeatherData } from "./WeatherData.js";
import { Event } from "./Event.js";

export function WeatherPrediction(from, to, type, unit, time, place) {
    let event = new Event(time, place);

    const getFrom = () => {
        return from;
    };

    const getTo = () => {
        return to;
    };

    const setFrom = function (_from) {
        from = _from;
    }

    const setTo = function (_to) {
        to = _to;
    }

    const getType = function () {
        return type;
    };

    const getUnit = function () {
        return unit;
    };

    const toString = () => `${type} between ${to}${unit} and ${from}${unit} at ${time}`;

    return {
        ...event,
        getFrom,
        getTo,
        getType,
        getUnit,
        setFrom,
        setTo,
        toString,
    };
}
