function createWind(speedInMS, direction) {
    let wind = {
        speedInMS,
        direction,

        getDirection() {
            return this.direction;
        },

        convertToMPH() {
            return this.speedInMS * 2.23694;
        },

        convertToMS() {
            return this.speedInMS;
        },
    };

    return wind;
}