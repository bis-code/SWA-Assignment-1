function Event(time, place) {
    const getTime = () => {
        return time;
    };

    const getPlace = () => {
        return place;
    };

    const setTime = (_time) => {
        time = _time;
    };

    const setPlace = (_place) => {
        place = _place;
    };

    return {
        getTime,
        setTime,
        getPlace,
        setPlace
    }
}
