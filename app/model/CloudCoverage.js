import {createWheaterData} from "./WheaterData"

function createCloudCoverage(value, type, unit, time, place) {
    let wheaterData = createWheaterData(value, type, unit, time, place);

    let cloudCoverage = Object.assign({}, wheaterData);

    return cloudCoverage;
}

module.exports = {
    createCloudCoverage
}