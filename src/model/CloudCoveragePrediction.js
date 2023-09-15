function createCloudCoveragePrediction(value, type, unit, time, place) {
    let weatherPrediction = new WeatherPrediction(value, type, unit);
    return {
        ...weatherPrediction
    };
}
