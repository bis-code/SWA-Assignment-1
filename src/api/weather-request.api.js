import {deserializedDataPrediction} from "../utils/utils.js";

export async function fetchDataForecastByPlace(place) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `http://localhost:8080/forecast/${place}`);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                try {
                    const jsonData = JSON.parse(xhr.responseText);

                    const deserialized = deserializedDataPrediction(jsonData);
                    resolve(deserialized);
                } catch (error) {
                    console.log("Error parsing JSON: " + error);
                    reject(error);
                }
            } else {
                const errorMessage = `HTTP error! Status: ${xhr.status}`;
                console.log(errorMessage);
                reject(new Error(errorMessage));
            }
        };

        xhr.onerror = () => {
            console.log("Network error occurred");
            reject(new Error("Network error"));
        };

        xhr.send();
    });
}

export async function fetchDataForecast() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/forecast");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => {
            if (xhr.status === 200) {
                try {
                    const jsonData = JSON.parse(xhr.responseText);

                    const deserialized = deserializedDataPrediction(jsonData);
                    resolve(deserialized);
                } catch (error) {
                    console.log("Error parsing JSON: " + error);
                    reject(error);
                }
            } else {
                const errorMessage = `HTTP error! Status: ${xhr.status}`;
                console.log(errorMessage);
                reject(new Error(errorMessage));
            }
        };

        xhr.onerror = () => {
            console.log("Network error occurred");
            reject(new Error("Network error"));
        };

        xhr.send();
    });
}