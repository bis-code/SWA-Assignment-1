function createEvent(time, place){
    return{
        getTime(){
            return time;
        },

        getPlace(){
            return place;
        },
    };
}