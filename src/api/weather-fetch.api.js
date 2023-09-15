import {deserializedData} from "../utils/utils.js";

export async function fetchData() {
    try {
        const response = await fetch("http://localhost:8080/data");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        const deserialized = deserializedData(jsonData);
        return deserialized;
    } catch (error) {
        console.log("Error on fetchData(): " + error);
        throw error;
    }
}

export async function fetchDataByPlace(place) {
    try {
        const response = await fetch(`http://localhost:8080/data/${place}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();

        const deserialized = deserializedData(jsonData);

        return deserialized;
    } catch (error) {
        console.log(`Error on fetchDataByPlace(${place}): ${error}`);
        throw error;
    }
}

