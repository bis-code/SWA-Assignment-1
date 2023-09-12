function createPrecipitation(precipitationInMM, type) {
    let precipitation = {
        precipitationInMM,
        type,

        getPrecipitationType() {
            return this.type;
        },

        convertToInches() {
            return this.precipitationInMM * 0.0393701;
        },

        convertToMM() {
            return this.precipitationInMM;
        },
    };

    return precipitation;

}