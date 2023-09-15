const { Types } = require("../model/constants/Constants");
const { createPrecipitation, Precipitation} = require("../model/Precipitation");
const { createTemperature, Temperature} = require("../model/Temperature");
const { createWind, Wind} = require("../model/Wind");
const { createCloudCoverage, CloudCoverage} = require("../model/CloudCoverage");

// method used for GET "/data" ENDPOINT
function deserializedData(jsonData) {
    const deserializedData = jsonData.map(item => {
        try {
            switch (item.type) {
                case Types.TEMPERATURE: {
                    return new Temperature(item.value, item.type, item.unit, item.time, item.place);
                }
                case Types.PRECIPITATION: {
                    return new Precipitation(item.value, item.type, item.unit, item.time, item.place, item.precipitation_type);
                }
                case Types.WIND_SPEED: {
                    return new Wind(item.value, item.type, item.unit, item.time, item.place, item.direction);
                }
                case Types.CLOUD_COVERAGE: {
                    return new CloudCoverage(item.value, item.type, item.unit, item.time, item.place);
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

function deserializedDataPrediction(jsonData) {
    const deserializedDataPrediction = jsonData.map(item => {
        try {
            switch (item.type) {
                case Types.TEMPERATURE: {
                    return new TemperaturePrediction(item.value, item.type, item.unit, item.time, item.place);
                }
                case Types.PRECIPITATION: {
                    return new Precipitation(item.value, item.type, item.unit, item.time, item.place, item.precipitation_type);
                }
                case Types.WIND_SPEED: {
                    return new Wind(item.value, item.type, item.unit, item.time, item.place, item.direction);
                }
                case Types.CLOUD_COVERAGE: {
                    return new CloudCoverage(item.value, item.type, item.unit, item.time, item.place);
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



// //method for GET "/data/<place>"
// function deserializedDataByPlace(jsonData, place) {
//     const deserializedData = jsonData.filter(item => item.place === place).map(item => {
//         switch (item.type) {
//             case Types.TEMPERATURE: {
//                 return new Temperature(item.value, item.type, item.unit, item.time, item.place);
//             }
//             case Types.PRECIPITATION: {
//                 return new Precipitation(item.value, item.type, item.unit, item.time, item.place, item.precipitation_type);
//             }
//             case Types.WIND_SPEED: {
//                 return new Wind(item.value, item.type, item.unit, item.time, item.place, item.direction);
//             }
//             case Types.CLOUD_COVERAGE: {
//                 return new CloudCoverage(item.value, item.type, item.unit, item.time, item.place);
//             }
//             default:
//                 return null;
//         }
//     });
//     return deserializedData.filter(item => item !== null);
// }
//
// // method for GET/forecast
// function deserializedForecast(jsonData) {
//     const deserializedData = jsonData.map(item => {
//         switch (item.type) {
//             case Types.PRECIPITATION: {
//                 return new Precipitation(item.from, item.type, item.unit, item.time, item.place, item.to, item.precipitation_types || []);
//             }
//             case Types.TEMPERATURE: {
//                 return new Temperature(item.from, item.type, item.unit, item.time, item.place, item.to);
//             }
//             case Types.WIND_SPEED: {
//                 return new Wind(item.from, item.type, item.unit, item.time, item.place, item.to, item.directions || []);
//             }
//             case Types.CLOUD_COVERAGE: {
//                 return new CloudCoverage(item.from, item.type, item.unit, item.time, item.place, item.to);
//             }
//             default:
//                 return null;
//         }
//     });
//     return deserializedData.filter(item => item !== null);
// }
//
//
// // method for GET "/forecast/<place>"
//
// function deserializedForecastByPlace(jsonData, place) {
//     const deserializedData = jsonData
//         .filter(item => item.place === place)
//         .map(item => {
//             switch (item.type) {
//                 case Types.TEMPERATURE: {
//                     return new Temperature(item.from, item.type, item.unit, item.time, item.place, item.to);
//                 }
//                 case Types.PRECIPITATION: {
//                     return new Precipitation(item.from, item.type, item.unit, item.time, item.place, item.to, item.precipitation_types || []);
//                 }
//                 case Types.WIND_SPEED: {
//                     return new Wind(item.from, item.type, item.unit, item.time, item.place, item.to, item.directions || []);
//                 }
//                 case Types.CLOUD_COVERAGE: {
//                     return new CloudCoverage(item.from, item.type, item.unit, item.time, item.place, item.to);
//                 }
//                 default:
//                     return null;
//             }
//         });
//     return deserializedData.filter(item => item !== null);
// }



//TODO  , GET "/warnings", GET "/warnings/<id>", GET "/warnings/since/<time>"

module.exports = {
    deserializedData,
    deserializedDataByPlace,
    deserializedForecast,
    deserializedForecastByPlace,
};
