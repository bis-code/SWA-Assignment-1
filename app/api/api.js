const {deserializedData, deserializedDataByPlace, deserializedForecast, deserializedForecastByPlace} = require("../utils/utils");

async function fetchData() {
    try {
        const response = await fetch("http://localhost:8080/data");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        const deserialized = deserializedData(jsonData);
        //  console.log("Deserialized Data:");
        //   deserialized.forEach(item => {
        //     console.log("Item:");
        //   console.log("Type: " + item.getType());
        // console.log("Value: " + item.getValue());
        // console.log("Unit: " + item.getUnit());
        // console.log("Time: " + item.getTime());
        // console.log("Place: " + item.getPlace());
        // });
        return deserialized;
    } catch (error) {
        console.log("Error on fetchData(): " + error);
        throw error;
    }
}

async function fetchDataByPlace(place) {
    try {
        const response = await fetch(`http://localhost:8080/data/${place}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        // Use the imported deserializedDataByPlace function
        const deserialized = deserializedDataByPlace(jsonData, place);

        return deserialized;
    } catch (error) {
        console.log(`Error on fetchDataByPlace(${place}): ${error}`);
        throw error;
    }
}

async function fetchDataForecast() {
    try {
        const response = await fetch("http://localhost:8080/forecast");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        // Use the imported deserializedForecast function
        const deserialized = deserializedForecast(jsonData);

        return deserialized;
    } catch (error) {
        console.log("Error on fetchDataForecast: " + error);
        throw error;
    }
}

async function fetchDataForecastByPlace(place) {
    try {
        const response = await fetch(`http://localhost:8080/forecast/${place}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        // Use the imported deserializedForecastByPlace function
        const deserialized = deserializedForecastByPlace(jsonData, place);

        return deserialized;
    } catch (error) {
        console.log(`Error on fetchDataForecastByPlace(${place}): ` + error);
        throw error;
    }
}


async function fetchDataAndLog() {
    try {
        const data = await fetchData();
        console.log(data); // Log the fetched data
    } catch (error) {
        console.log("Error in fetchDataAndLog: " + error);
    }
}

async function fetchDataAndLogForCity(place) {
    try {
        const data = await fetchDataByPlace(place);
        return data;
    } catch (error) {
        console.error(`Error fetching data for ${place}: ${error}`);
        throw error;
    }
}

async function fetchDataAndLogForecast() {
    try {
        const forecastData = await fetchDataForecast();
        console.log("Forecast Data:");
        console.log(forecastData);
    } catch (error) {
        console.log("Error in fetchDataAndLogForecast: " + error);
    }
}

async function fetchDataAndLogForecastByPlace(place) {
    try {
        const forecastData = await fetchDataForecastByPlace(place);
        console.log(`Forecast Data for ${place}:`);
        console.log(forecastData);
    } catch (error) {
        console.log(`Error in fetchDataAndLogForecastByPlace(${place}): ` + error);
    }
}

fetchDataAndLogForCity("CITY HAS TO BE INSERTED HERE");
fetchDataAndLog();
fetchDataAndLogForecast();
fetchDataAndLogForecastByPlace("CITY HAS TO BE INSERTED HERE")

module.exports = {
    fetchData,
}
