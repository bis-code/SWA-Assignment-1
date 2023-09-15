function createWeatherPrediction(value, type, unit, time, place) {
    let weatherData = new WeatherData(value, type, unit, time, place);

    const matches = (data) => {
        return weatherData.getValue() === data.getValue()
            && weatherData.getType() === data.getType()
            && weatherData.getUnit() === data.getUnit()
            && weatherData.getTime() === data.getTime()
            && weatherData.getPlace() === data.getPlace();
    }

    const getMax = (weatherPrediction_) => {
        return Math.max(weatherData.getValue(), weatherPrediction_.getValue());
    }

    const getMin = (weatherPrediction_) => {
        return Math.min(weatherData.getValue(), weatherPrediction_.getValue());
    }

    const getType = () => weatherData.getType();
    const getUnit = () => weatherData.getUnit();

    return {
        ...weatherData,
        matches,
        getMax,
        getMin,
        getType,
        getUnit
    };
}
