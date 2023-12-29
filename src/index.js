import {fetchDataByPlace} from "./api/weather-fetch.api.js";
import {fetchDataForecastByPlace} from "./api/weather-request.api.js";
import {addHoursToDate, isDateBetween, dateIsLastDayFromCurrentDay, isSameDay} from "./utils/date.utils.js";
import {Temperature} from "./model/Temperature.js";
import {WeatherPrediction} from "./model/WeatherPrediction.js";
import {Wind} from "./model/Wind.js";
import {Precipitation} from "./model/Precipitation.js";

const cities = ['Horsens', 'Aarhus', 'Copenhagen'];
const currentDate = new Date();
let userDataSent = [];

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

    const container = document.getElementById(`latestMeasurements${cityIndex}`);
    let table = container.querySelector('table');

    if (!table) {
        table = document.createElement('table');
        table.classList.add('table');

        const caption = document.createElement('caption');
        caption.textContent = 'Latest Measurement';
        table.appendChild(caption);

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>Measurement Type</th>
            <th>Value</th>
        `;

        table.appendChild(headerRow);
    }

    const measurementTypes = ['temperature', 'wind speed', 'precipitation', 'cloud coverage'];

    measurementTypes.forEach((type) => {
        const latestMeasurement = data.find((measurement) => measurement.getType() === type);

        if (latestMeasurement) {
            const existingRow = table.querySelector(`tr[data-type="${type}"]`);
            if (existingRow) {
                const valueCell = existingRow.querySelector('td:last-child');
                const unit = latestMeasurement.getUnit();
                valueCell.textContent = `${latestMeasurement.getValue()} ${unit}`;
            } else {
                const row = document.createElement('tr');
                row.setAttribute('data-type', type);
                const typeCell = document.createElement('td');
                typeCell.textContent = type;
                const valueCell = document.createElement('td');
                const unit = latestMeasurement.getUnit();
                valueCell.textContent = `${latestMeasurement.getValue()} ${unit}`;

                row.appendChild(typeCell);
                row.appendChild(valueCell);
                table.appendChild(row);
            }
        }
    });

    container.innerHTML = '';
    container.appendChild(table);
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
    const measurementsIn24Hours = data.filter(measurement => {
        if (measurement instanceof WeatherPrediction) {
            return isDateBetween(measurement.getTime(), currentDate, dateIn24Hours);
        }
    });
    measurementsIn24Hours.forEach(measurement => {
        if (measurement instanceof WeatherPrediction) {
            const measurementParagraph = document.createElement('p');
            measurementParagraph.textContent = measurement.toString();
            container.appendChild(measurementParagraph);
        }
    });
}

function constructMeasurementForMinimumTemperatureLastDay(city, data, cityIndex) {
    const measurementsForMinimumTemperatureLastDayParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById(`measurementsForMinimumTemperatureLastDay${cityIndex}`);
    cityParagraph.textContent = city;
    container.appendChild(cityParagraph);

    const measurementsForMinimumTemperatureLastDay = data
        .filter(measurement => {
            if (measurement instanceof Temperature) {
                const isLastDay = dateIsLastDayFromCurrentDay(measurement.getTime());
                const isTemperature = measurement.getType() === "temperature";
                return isLastDay && isTemperature;
            }
            return false;
        })
        .map(measurement => {
            measurement.convertToC();
            return measurement.getValue();
        });

    if (measurementsForMinimumTemperatureLastDay.length > 0) {
        const minimumUnitOfMeasurementsForLastDay = Math.min(...measurementsForMinimumTemperatureLastDay);
        measurementsForMinimumTemperatureLastDayParagraph.textContent = "Measurements for the minimum temperature on the last day: " + minimumUnitOfMeasurementsForLastDay + "C";
    } else {
        measurementsForMinimumTemperatureLastDayParagraph.textContent = "No temperature measurements found for the last day.";
    }

    container.appendChild(measurementsForMinimumTemperatureLastDayParagraph);
}

function constructMeasurementForTotalPrecipitationLastDay(city, data, cityIndex) {
    const measurementsForTotalPrecipitationLastDayParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById(`measurementsForTotalPrecipitationLastDay${cityIndex}`);
    cityParagraph.textContent = city;
    container.appendChild(cityParagraph);

    let totalPrecipitationLastDay = 0;
    const measurementsForTotalPrecipitationLastDay = data.filter(measurement => {
        if (measurement instanceof Precipitation) {
            const isLastDay = dateIsLastDayFromCurrentDay(measurement.getTime());
            const isPrecipitation = measurement.getType() === "precipitation";
            return isLastDay && isPrecipitation;
        }
        return false;
    })
        .map(measurement => {
            measurement.convertToMM();
            totalPrecipitationLastDay += measurement.getValue();
        });

    if (measurementsForTotalPrecipitationLastDay.length > 0) {
        measurementsForTotalPrecipitationLastDayParagraph.textContent = "Measurements for total precipitation in the last day " + Number(totalPrecipitationLastDay).toFixed(2) + "mm";
    } else {
        measurementsForTotalPrecipitationLastDayParagraph.textContent = "No precipitation measurements found for the last day";
    }
    container.appendChild(measurementsForTotalPrecipitationLastDayParagraph);
}

function constructAverageWindSpeedForLastDay(city, data, cityIndex) {
    const measurementsAverageWindSpeedForLastDayParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById(`averageWindSpeedForLastDay${cityIndex}`);
    cityParagraph.textContent = city;
    container.appendChild(cityParagraph);

    let totalWindSpeed = 0;
    const measurementsAverageWindSpeedForLastDay = data.filter(measurement => {
        if (measurement instanceof Wind) {
            const isLastDay = dateIsLastDayFromCurrentDay(measurement.getTime());
            const isWind = measurement.getType() === "wind speed";
            return isLastDay && isWind;
        }
        return false;
    })
        .map(measurement => {
            measurement.convertToMPH();
            totalWindSpeed += measurement.getValue();
        });
    if (measurementsAverageWindSpeedForLastDay.length > 0) {
        measurementsAverageWindSpeedForLastDayParagraph.textContent = "Average wind speed for the last day " + Number(totalWindSpeed / measurementsAverageWindSpeedForLastDay.length).toFixed(2) + " MPH";
    } else {
        measurementsAverageWindSpeedForLastDay.textContent = "No wind speed measurements for the last day";
    }
    container.appendChild(measurementsAverageWindSpeedForLastDayParagraph);
}

function constructMeasurementForMaximumTemperatureLastDay(city, data, cityIndex) {
    const measurementsForMaximumTemperatureLastDayParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById(`measurementsForMaximumTemperatureLastDay${cityIndex}`);
    cityParagraph.textContent = city;
    container.appendChild(cityParagraph);

    const measurementsForMaximumTemperatureLastDay = data.filter(measurement => {
        if (measurement instanceof Temperature) {
            const isLastDay = dateIsLastDayFromCurrentDay(measurement.getTime());
            const isTemperature = measurement.getType() === "temperature";
            return isLastDay && isTemperature;
        }
        return false;
    }).map(measurement => {
        return measurement.getValue();
    });

    if (measurementsForMaximumTemperatureLastDay.length > 0) {
        const maximumUnitOfMeasurementsForLastDay = Math.max(...measurementsForMaximumTemperatureLastDay);
        measurementsForMaximumTemperatureLastDayParagraph.textContent = "Measurements for the maximum temperature in the last day " + maximumUnitOfMeasurementsForLastDay + "C";
    }
    else {
        measurementsForMaximumTemperatureLastDayParagraph.textContent = "No temperature measurements found for the last day.";
    }
    container.appendChild(measurementsForMaximumTemperatureLastDayParagraph);
}

async function postDataFromUser() {
    const API_URI = 'http://localhost:8080/data';

    try {
        const formData = {
            type: document.getElementById('userDataType').value,
            time: document.getElementById('userDataTime').value,
            place: document.getElementById('userDataPlace').value,
            from: parseFloat(document.getElementById('userDataFrom').value),
            to: parseFloat(document.getElementById('userDataTo').value),
            unit: document.getElementById('userDataUnit').value,
            precipitationTypes: document.getElementById('userDataPrecipitationTypes').value.split(','),
            directions: document.getElementById('userDataDirections').value.split(',')
        };

        const response = await fetch(API_URI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(formData)
        });

        console.log('Response', response);

        const responseData = await response.json();

        if (response.status === 201) {
            userDataSent.push(formData);
            console.log(`${formData.type} data sent successfully.`);
            document.getElementById('statusOutput').innerText = 'Weather data successfully added!';
            resetForm();
        } else {
            console.error(`Failed to send ${formData.type} data. HTTP status: ${response.status}`);
            console.error('Response Data:', responseData);
            document.getElementById('statusOutput').innerText = `Failed to send ${formData.type} data.`;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        document.getElementById('statusOutput').innerText = 'Error sending weather data: ' + error;
    }
}

function resetForm() {
    document.getElementById('userDataType').value = '';
    document.getElementById('userDataTime').value = '';
    document.getElementById('userDataPlace').value = '';
    document.getElementById('userDataFrom').value = '';
    document.getElementById('userDataTo').value = '';
    document.getElementById('userDataUnit').value = '';
    document.getElementById('userDataPrecipitationTypes').value = '';
    document.getElementById('userDataDirections').value = '';
}

function renderDataSent() {
    const dataSentContainer = document.getElementById('dataSentContainer');
    dataSentContainer.innerHTML = '';

    if (userDataSent.length === 0) {
        dataSentContainer.textContent = 'No data sent by the user yet.';
        return;
    }

    const table = document.createElement('table');
    table.classList.add('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    const headers = ['Type', 'Time', 'Place', 'From', 'To', 'Unit', 'Precipitation Types', 'Directions'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    userDataSent.forEach(item => {
        const row = document.createElement('tr');
        const values = [
            item.type,
            item.time,
            item.place,
            item.from,
            item.to,
            item.unit,
            item.precipitationTypes.join(', '),
            item.directions.join(', ')
        ];
        values.forEach(valueText => {
            const cell = document.createElement('td');
            cell.textContent = valueText;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    dataSentContainer.appendChild(table);
}

async function displayMeasurementsForNext24Hours(cityIndex) {
    try {
        const city = cities[cityIndex - 1];
        // example of using with await
        const data = await fetchDataForecastByPlace(city);
        // example of using the then and catch
        // const data = fetchDataForecastByPlace(city)
        //     .then((responsePromise) => {
        //         return responsePromise;
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

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

    submitButton.addEventListener('click', async () => {
        try {
            await postDataFromUser();
            console.log('Data sent successfully.');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    });
});

document.querySelector('#dataSent-tab').addEventListener('click', renderDataSent);
