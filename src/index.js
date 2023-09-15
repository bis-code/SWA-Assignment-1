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
        measurement.convertToC();
        return measurement.getValue();
    });
    const minimumUnitOfMeasurementsForLastDay = Math.min(...measurementsForMinimumTemperatureLastDay);
    measurementsForMinimumTemperatureLastDayParagraph.textContent = "Measurements for the minimum temperature in the last day " + minimumUnitOfMeasurementsForLastDay + "C";
    container.appendChild(measurementsForMinimumTemperatureLastDayParagraph);
}

function constructMeasurementForTotalPrecipitationLastDay(city, data){
    const measurementForTotalPrecipitationLastDay = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById("measurementsForMinimumTemperatureLastDay");
    cityParagraph.textContent = city;
    container.appendChild(cityParagraph);

    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);
    let totalPrecipitationLastDay = 0;
    const measurementsForPrecipitationLastDay = data.forEach(measurement => {
        const isLastDay = isSameDay(measurement.getTime(), lastDay);
        const isPrecipitation = measurement.getType() === "precipitation";

        if (isLastDay && isPrecipitation) {
            measurement.convertToMM();
            totalPrecipitationLastDay += measurement.getValue();
            console.log(totalPrecipitationLastDay);
        }
    });

    measurementForTotalPrecipitationLastDay.textContent = "Measurements for total precipitation in the last day " + Number(totalPrecipitationLastDay).toFixed(2) + "mm";
    container.appendChild(measurementForTotalPrecipitationLastDay);
}

function constructAverageWindSpeedForLastDay(city, data) {
    const averageWindSpeedForLastDayParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const container = document.getElementById("averageWindSpeedForLastDay");
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
    averageWindSpeedForLastDayParagraph.textContent = "Average wind speed for the last day " + Number(totalWindSpeed/totalLengthOfWindMeasurements).toFixed(2) + " MPH";
    container.appendChild(averageWindSpeedForLastDayParagraph);
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

async function displayTotalPrecipitationForLastDay() {
    try {
        for (const city of cities) {
            const data = await fetchDataByPlace(city);
            constructMeasurementForTotalPrecipitationLastDay(city, data);
        }
    } catch (error) {
        console.error(error);
    }
}

async function displayAverageWindSpeedForLastDay() {
    try {
        for (const city of cities) {
            const data = await fetchDataByPlace(city);
            constructAverageWindSpeedForLastDay(city, data);
        }
    } catch (error) {
        console.error(error);
    }
}

async function displayDataForWholePage() {
    await displayDataPerCities();
    await displayMeasurementsForNext24Hours();
    await displayMinimumTemperatureForLastDay();
    await displayTotalPrecipitationForLastDay();
    await displayAverageWindSpeedForLastDay();
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
