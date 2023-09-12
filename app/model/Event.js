function createEvent(time, place){

    let event = {
        time,
        place,

        getTime(){
            return this.time;
        },

        getPlace(){
            return this.place;
        },

        setTime(_time){
            this.time = _time;
        },

        setPlace(_place){
            this.place = _place;
        },
    };

    return event;
}

module.exports = {
    createEvent,
}