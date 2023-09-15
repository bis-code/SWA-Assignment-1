import {fetchData, fetchDataByPlace} from "./api/weather-fetch.api.js";
import {isSameDay} from "./utils/date.utils.js";

const cities = ['Horsens', 'Aarhus', 'Copenhagen']
const currentDate = new Date();

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

    // get date from last day
    currentDate.setDate(currentDate.getDate() - 1);
    const latestMeasurementData = data.filter(measurement => isSameDay(measurement.getTime(), currentDate));

    latestMeasurementData.forEach((measurement) => {
        // Create a new <div> element for each object
        const measurementParagraph = document.createElement('p');

        measurementParagraph.textContent = measurement.toString();

        // Append the <div> element to the container
        container.appendChild(measurementParagraph);
    });
}

async function displayDataForWholePage() {
    await displayDataPerCities();
}
document.addEventListener('DOMContentLoaded', displayDataForWholePage);
