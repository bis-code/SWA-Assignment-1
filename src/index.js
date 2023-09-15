import {fetchData, fetchDataByPlace} from "./api/weather-fetch.api.js";
import {fetchDataForecast, fetchDataForecastByPlace} from "./api/weather-request.api.js"
import {addHoursToDate, isDateBetween, isSameDay} from "./utils/date.utils.js";

const cities = ['Horsens', 'Aarhus', 'Copenhagen']
const currentDate = new Date();
const requestButton = document.getElementById('requestButton');

async function displayDataPerCities() {
    try {
        for (const city of cities) {
            const data = await fetchDataByPlace(city);
            constructLatestMeasurement(city, data);
        }
    } catch (error) {
        console.error(error);
    }
}

function constructLatestMeasurement(city, data) {
    const latestMeasurement = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById("latestMeasurements");
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

function constructMeasurementsIn24Hours(city, data){
    const measurementsIn24HoursParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById("measurementsIn24Hours");
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

function constructMeasurementForMinimumTemperatureLastDay(city, data){
    const measurementsForMinimumTemperatureLastDayParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById("measurementsForMinimumTemperatureLastDay");
    cityParagraph.textContent = city;
    container.appendChild(cityParagraph);
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);
    const measurementsForMinimumTemperatureLastDay = data.filter(measurement => {
        const isLastDay = isSameDay(measurement.getTime(), lastDay);
        const isTemperature = measurement.getType() === "temperature";
        return isLastDay && isTemperature;
    }).map(measurement => {
        console.log(measurement.getValue());
        return measurement.getValue();
    });
    const minimumUnitOfMeasurementsForLastDay = Math.min(...measurementsForMinimumTemperatureLastDay);
    measurementsForMinimumTemperatureLastDayParagraph.textContent = "Measurements for the minimum temperature in the last day " + minimumUnitOfMeasurementsForLastDay;
    container.appendChild(measurementsForMinimumTemperatureLastDayParagraph);
}

function constructMeasurementForMaximumTemperatureLastDay(city, data){
    const measurementsForMaximumTemperatureLastDayParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById("measurementsForMaximumTemperatureLastDay");
    cityParagraph.textContent = city;
    container.appendChild(cityParagraph);
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);
    const measurementsForMaximumTemperatureLastDay = data.filter(measurement => {
        const isLastDay = isSameDay(measurement.getTime(), lastDay);
        const isTemperature = measurement.getType() === "temperature";
        return isLastDay && isTemperature;
    }).map(measurement => {
        console.log(measurement.getValue());
        return measurement.getValue();
    });
    const maximumUnitOfMeasurementsForLastDay = Math.max(...measurementsForMaximumTemperatureLastDay);
    measurementsForMaximumTemperatureLastDayParagraph.textContent = "Measurements for the maximum temperature in the last day " + maximumUnitOfMeasurementsForLastDay;
    container.appendChild(measurementsForMaximumTemperatureLastDayParagraph);
}


async function displayMeasurementsForNext24Hours() {
    try {
        for (const city of cities) {
            const data = await fetchDataForecastByPlace(city);
            constructMeasurementsIn24Hours(city, data);
        }
    } catch (error) {
        console.error(error);
    }
}

async function displayMinimumTemperatureForLastDay() {
    try {
        for (const city of cities) {
            const data = await fetchDataByPlace(city);
            constructMeasurementForMinimumTemperatureLastDay(city, data);
        }
    } catch (error) {
        console.error(error);
    }
}

async function displayMaximumTemperatureForLastDay() {
    try {
        for (const city of cities) {
            const data = await fetchDataByPlace(city);
            constructMeasurementForMaximumTemperatureLastDay(city, data);
        }
    } catch (error) {
        console.error(error);
    }
}

 
async function displayDataForWholePage() {
    await displayDataPerCities();
    await displayMeasurementsForNext24Hours();
    await displayMinimumTemperatureForLastDay();
    await displayMaximumTemperatureForLastDay();
}
document.addEventListener('DOMContentLoaded', displayDataForWholePage);

requestButton.addEventListener("click", async () =>{
    try{
        const data = await fetchDataForecast();
        console.log(data);
        document.getElementById("requestResult").textContent = data[0].getTo();
    } catch (error){
        console.error(error);
    }
});
