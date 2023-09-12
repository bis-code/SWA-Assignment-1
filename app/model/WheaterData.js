function createWheaterData(value, type, unit){

    let wheaterData = {
        value,
        type,
        unit,

        getValue(){
            return this.value;
        },

        getType(){
            return this.type;
        },

        getUnit(){
            return this.unit;
        },
    };

    return wheaterData;
}

module.exports = {
    createWheaterData
}