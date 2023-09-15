function createWindPrediction(value, type, unit, time, place, direction) {
    let weatherPrediction = new WeatherPrediction(value, type, unit, time, place);

    const getExpectedDirections = () => direction;

    const matches = (data) => weatherPrediction.matches(data);

    const convertToMPH = () => {
        if (weatherPrediction.getUnit() !== 'm/h') {
            weatherPrediction.setValue(weatherPrediction.getValue() * 2.237);
            weatherPrediction.setUnit('m/h');
        }
    }

    const convertToMPS = () => {
        if (weatherPrediction.getUnit() !== 'm/s') {
            weatherPrediction.setValue(weatherPrediction.getValue() / 2.237);
            weatherPrediction.setUnit('m/s');
        }
    }

    return {
        ...weatherPrediction,
        getExpectedDirections,
        matches,
        convertToMPH,
        convertToMPS
    };
}