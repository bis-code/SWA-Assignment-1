const {deserializedData} = require("../utils/utils");
async function fetchData() {
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

async function fetchDataAndLog() {
    try {
        const data = await fetchData();
        console.log(data); // Log the fetched data
    } catch (error) {
        console.log("Error in fetchDataAndLog: " + error);
    }
}

fetchDataAndLog();

module.exports = {
    fetchData,
}


