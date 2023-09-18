import { fetchDataByPlace } from "./api/weather-fetch.api.js";
import { fetchDataForecastByPlace } from "./api/weather-request.api.js";
import { addHoursToDate, isDateBetween, isSameDay } from "./utils/date.utils.js";

const cities = ['Horsens', 'Aarhus', 'Copenhagen'];
const currentDate = new Date();

async function displayDataPerCities() {
    try {
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];
            const data = await fetchDataByPlace(city);
            constructLatestMeasurement(city, data, i + 1);
        }
    } catch (error) {
        console.error(error);
    }
}

function constructLatestMeasurement(city, data, cityIndex) {
    const latestMeasurement = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById(`latestMeasurements${cityIndex}`);
    latestMeasurement.textContent = 'Latest measurement per city';
    cityParagraph.textContent = city;
    container.appendChild(latestMeasurement);
    container.appendChild(cityParagraph);

    const currentDateMinusOneDay = new Date();
    currentDateMinusOneDay.setDate(currentDateMinusOneDay.getDate() - 1);
    const latestMeasurementData = data.filter(measurement => isSameDay(measurement.getTime(), currentDateMinusOneDay));

    latestMeasurementData.forEach((measurement) => {
        const measurementParagraph = document.createElement('p');
        measurementParagraph.textContent = measurement.toString();
        container.appendChild(measurementParagraph);
    });
}

function constructMeasurementsIn24Hours(city, data, cityIndex) {
    const measurementsIn24HoursParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById(`measurementsIn24Hours${cityIndex}`);
    measurementsIn24HoursParagraph.textContent = "Measurements in 24 hours";
    cityParagraph.textContent = city;
    container.appendChild(measurementsIn24HoursParagraph);
    container.appendChild(cityParagraph);

    const dateIn24Hours = addHoursToDate(currentDate, 24);
    const measurementsIn24Hours = data.filter(measurement => isDateBetween(measurement.getTime(), currentDate, dateIn24Hours));
    measurementsIn24Hours.forEach(measurement => {
        const measurementParagraph = document.createElement('p');
        measurementParagraph.textContent = measurement.toString();
        container.appendChild(measurementParagraph);
    });
}

function constructMeasurementForMinimumTemperatureLastDay(city, data, cityIndex) {
    const measurementsForMinimumTemperatureLastDayParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById(`measurementsForMinimumTemperatureLastDay${cityIndex}`);
    cityParagraph.textContent = city;
    container.appendChild(cityParagraph);
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);
    const measurementsForMinimumTemperatureLastDay = data.filter(measurement => {
        const isLastDay = isSameDay(measurement.getTime(), lastDay);
        const isTemperature = measurement.getType() === "temperature";
        return isLastDay && isTemperature;
    }).map(measurement => {
        measurement.convertToC();
        return measurement.getValue();
    });
    const minimumUnitOfMeasurementsForLastDay = Math.min(...measurementsForMinimumTemperatureLastDay);
    measurementsForMinimumTemperatureLastDayParagraph.textContent = "Measurements for the minimum temperature in the last day " + minimumUnitOfMeasurementsForLastDay + "C";
    container.appendChild(measurementsForMinimumTemperatureLastDayParagraph);
}

function constructMeasurementForTotalPrecipitationLastDay(city, data, cityIndex) {
    const measurementForTotalPrecipitationLastDay = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById(`measurementsForTotalPrecipitationLastDay${cityIndex}`);
    cityParagraph.textContent = city;
    container.appendChild(cityParagraph);

    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);
    let totalPrecipitationLastDay = 0;
    data.forEach(measurement => {
        const isLastDay = isSameDay(measurement.getTime(), lastDay);
        const isPrecipitation = measurement.getType() === "precipitation";

        if (isLastDay && isPrecipitation) {
            measurement.convertToMM();
            totalPrecipitationLastDay += measurement.getValue();
        }
    });

    measurementForTotalPrecipitationLastDay.textContent = "Measurements for total precipitation in the last day " + Number(totalPrecipitationLastDay).toFixed(2) + "mm";
    container.appendChild(measurementForTotalPrecipitationLastDay);
}

function constructAverageWindSpeedForLastDay(city, data, cityIndex) {
    const averageWindSpeedForLastDayParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById(`averageWindSpeedForLastDay${cityIndex}`);
    cityParagraph.textContent = city;
    container.appendChild(cityParagraph);
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);
    let totalWindSpeed = 0;
    let totalLengthOfWindMeasurements = 0;
    data.forEach(measurement => {
        const isLastDay = isSameDay(measurement.getTime(), lastDay);
        const isWind = measurement.getType() === "wind speed";

        if (isLastDay && isWind) {
            measurement.convertToMPH();
            totalWindSpeed += measurement.getValue();
            totalLengthOfWindMeasurements++;
        }
    });
    averageWindSpeedForLastDayParagraph.textContent = "Average wind speed for the last day " + Number(totalWindSpeed / totalLengthOfWindMeasurements).toFixed(2) + " MPH";
    container.appendChild(averageWindSpeedForLastDayParagraph);
}

function constructMeasurementForMaximumTemperatureLastDay(city, data, cityIndex) {
    const measurementsForMaximumTemperatureLastDayParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById(`measurementsForMaximumTemperatureLastDay${cityIndex}`);
    cityParagraph.textContent = city;
    container.appendChild(cityParagraph);
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);
    const measurementsForMaximumTemperatureLastDay = data.filter(measurement => {
        const isLastDay = isSameDay(measurement.getTime(), lastDay);
        const isTemperature = measurement.getType() === "temperature";
        return isLastDay && isTemperature;
    }).map(measurement => {
        return measurement.getValue();
    });
    const maximumUnitOfMeasurementsForLastDay = Math.max(...measurementsForMaximumTemperatureLastDay);
    measurementsForMaximumTemperatureLastDayParagraph.textContent = "Measurements for the maximum temperature in the last day " + maximumUnitOfMeasurementsForLastDay;
    container.appendChild(measurementsForMaximumTemperatureLastDayParagraph);
}

async function postDataFromUser() {
    try {
        const type = document.getElementById('userDataType').value;
        const time = document.getElementById('userDataTime').value;
        const place = document.getElementById('userDataPlace').value;
        const fromValue = parseFloat(document.getElementById('userDataFrom').value);
        const toValue = parseFloat(document.getElementById('userDataTo').value);
        const unit = document.getElementById('userDataUnit').value;
        const precipitationTypes = document.getElementById('userDataPrecipitationTypes').value.split(',');
        const directions = document.getElementById('userDataDirections').value.split(',');

        const endpoint = 'http://localhost:8080/POST/data';

        const dataItem = {
            type,
            time,
            place,
            from: fromValue,
            to: toValue,
            unit,
            precipitation_types: precipitationTypes,
            directions,
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataItem),
        });

        if (response) { // Check if response exists
            if (response.ok) {
                console.log(`${type} data sent successfully.`);
            } else {
                console.error(`Failed to send ${type} data.`);
            }
        } else {
            console.error('No response received from the server.');
        }
    } catch (error) {
        console.error('Error sending weather data:', error);
    }
}



async function displayMeasurementsForNext24Hours(cityIndex) {
    try {
        const city = cities[cityIndex - 1];
        const data = await fetchDataForecastByPlace(city);
        constructMeasurementsIn24Hours(city, data, cityIndex);
    } catch (error) {
        console.error(error);
    }
}

async function displayMinimumTemperatureForLastDay(cityIndex) {
    try {
        const city = cities[cityIndex - 1];
        const data = await fetchDataByPlace(city);
        constructMeasurementForMinimumTemperatureLastDay(city, data, cityIndex);
    } catch (error) {
        console.error(error);
    }
}

async function displayTotalPrecipitationForLastDay(cityIndex) {
    try {
        const city = cities[cityIndex - 1];
        const data = await fetchDataByPlace(city);
        constructMeasurementForTotalPrecipitationLastDay(city, data, cityIndex);
    } catch (error) {
        console.error(error);
    }
}

async function displayAverageWindSpeedForLastDay(cityIndex) {
    try {
        const city = cities[cityIndex - 1];
        const data = await fetchDataByPlace(city);
        constructAverageWindSpeedForLastDay(city, data, cityIndex);
    } catch (error) {
        console.error(error);
    }
}

async function displayMaximumTemperatureForLastDay(cityIndex) {
    try {
        const city = cities[cityIndex - 1];
        const data = await fetchDataByPlace(city);
        constructMeasurementForMaximumTemperatureLastDay(city, data, cityIndex);
    } catch (error) {
        console.error(error);
    }
}

async function displayDataForWholePage() {
    for (let i = 0; i < cities.length; i++) {
        await displayDataPerCities();
        await displayMeasurementsForNext24Hours(i + 1);
        await displayMinimumTemperatureForLastDay(i + 1);
        await displayTotalPrecipitationForLastDay(i + 1);
        await displayAverageWindSpeedForLastDay(i + 1);
        await displayMaximumTemperatureForLastDay(i + 1);
    }
}

document.addEventListener('DOMContentLoaded', displayDataForWholePage);
document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitUserForm');

    submitButton.addEventListener('click', () => {
        postDataFromUser()
            .then(response => {
                if (response.ok) {
                    console.log('Data sent successfully.');
                } else {
                    console.error('Failed to send data.');
                }
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    });
});

