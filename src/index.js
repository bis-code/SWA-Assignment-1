import {fetchData} from "./api/weather-fetch.api.js";

const fetchButton = document.getElementById('fetchButton');

fetchButton.addEventListener('click', async () => {
    try {
        const data = await fetchData();
        console.log(data);
        document.getElementById('result').textContent = data[0].getTime();
    } catch (error) {
        console.error(error);
    }
});
