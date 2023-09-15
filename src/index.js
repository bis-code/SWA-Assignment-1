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

async function displayDataForWholePage() {
    await displayDataPerCities();
    await displayMeasurementsForNext24Hours();
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
