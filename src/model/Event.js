export function Event(time, place) {
    this.time = time;
    this.place = place;
}

Event.prototype.constructor = Event;

Event.prototype.getTime = function () {
    return this.time;
}
Event.prototype.setTime = function (newTime) {
    this.time = newTime;
}
Event.prototype.getPlace = function () {
    return this.place;
}
Event.prototype.setPlace = function (newPlace) {
    this.place = newPlace;
}
