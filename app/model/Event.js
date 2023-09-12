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
    };

    return event;
}