function createTemperature(value, type, unit, time, place) {
    let weatherData = new WeatherData(value, type, unit, time, place);

    const convertToF = () => {
        if (weatherData.getUnit() !== 'F') {
            weatherData.setValue((weatherData.getValue() * 9 / 5) + 32);
            weatherData.setUnit('F');
        }
    }

    const convertToC = () => {
        if (weatherData.getUnit() !== 'C') {
            weatherData.setValue((weatherData.getValue() - 32) * 5 / 9);
            weatherData.setUnit('C');
        }
    }

    return {
        ...weatherData,
        convertToF,
        convertToC,
    }
}