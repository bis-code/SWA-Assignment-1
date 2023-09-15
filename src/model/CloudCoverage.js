function createCloudCoverage(value, type, unit, time, place) {
    let weatherData = new WeatherData(value, type, unit, time, place);

    return {
        ...weatherData
    };
}