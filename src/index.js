import {fetchData} from "./api/weather-fetch.api.js";
import {fetchDataForecast} from "./api/weather-request.api.js"

const fetchButton = document.getElementById('fetchButton');
const requestButton = document.getElementById('requestButton');

fetchButton.addEventListener('click', async () => {
    try {
        const data = await fetchData();
        console.log(data);
        document.getElementById('result').textContent = data[0].getTime();
    } catch (error) {
        console.error(error);
    }
});

requestButton.addEventListener("click", async () =>{
    try{
        const data = await fetchDataForecast();
        console.log(data);
        document.getElementById("requestResult").textContent = data[0].getTo();
    } catch (error){
        console.error(error);
    }
});
