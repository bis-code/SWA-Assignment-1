function createTemperature(temp){
    let temperature = {
        temp,

        convertToF(){
            return(this.temp * 9/5) + 32;
        },

        convertToC(){
            return this.temp;
        },
    };

    return temperature;
}