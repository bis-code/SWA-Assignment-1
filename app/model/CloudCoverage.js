import {createWheaterData} from "./WheaterData"

function cloudCoverage(value, type, unit) {
    let wheaterData = createWheaterData(value, type, unit);

    let cloudCoverage = Object.assign({}, wheaterData);

    return cloudCoverage;
}