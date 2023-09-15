function createPrecipitationPrediction(value, type, unit, time, place, precipitation_type) {
    let weatherPrediction = new WeatherPrediction(value, type, unit, time, place);

    const getPrecipitationType = () => precipitation_type;

    const matches = (data) => {
        return weatherPrediction.getValue() === data.getValue()
            && weatherPrediction.getType() === data.getType()
            && weatherPrediction.getUnit() === data.getUnit()
            && weatherPrediction.getTime() === data.getTime()
            && weatherPrediction.getPlace() === data.getPlace();
    }

    const convertToInches = () => {
        if (weatherPrediction.getUnit() !== 'in') {
            weatherPrediction.setValue(weatherPrediction.getValue() / 25.4);
            weatherPrediction.setUnit('in');
        }
    }

    const convertToMM = () => {
        if (weatherPrediction.getUnit() !== 'mm') {
            weatherPrediction.setValue(weatherPrediction.getValue() * 25.4);
            weatherPrediction.setUnit('mm');
        }
    }

    return {
        ...weatherPrediction,
        matches,
        getPrecipitationType,
        convertToMM,
        convertToInches
    }
}