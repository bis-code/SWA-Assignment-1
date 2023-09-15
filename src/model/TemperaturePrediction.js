function TemperaturePrediction(value, type, unit, time, place) {
    let weatherPrediction = new WeatherPrediction(value, type, unit, time, place);

    const convertToF = () => {
        if (weatherPrediction.getUnit() !== 'F') {
            weatherPrediction.setValue((weatherPrediction.getValue() * 9 / 5) + 32);
            weatherPrediction.setUnit('F');
        }
    }

    const convertToC = () => {
        if (weatherPrediction.getUnit() !== 'C') {
            weatherPrediction.setValue((weatherPrediction.getValue() - 32) * 5 / 9);
            weatherPrediction.setUnit('C');
        }
    }

    return {
        ...weatherPrediction,
        convertToF,
        convertToC
    };
}