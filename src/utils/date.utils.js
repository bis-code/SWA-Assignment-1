export function isSameDay(date1, date2) {
    const convertedDate1 = new Date(date1);
    const convertedDate2 = new Date(date2);
    return convertedDate1.toDateString() === convertedDate2.toDateString();
}

export function addHoursToDate(date, hours){
    const dateObj = new Date(date);
    return new Date(dateObj.setHours(dateObj.getHours() + hours));
}

export function isDateBetween(checkDate, dateFrom, dateTo){
    checkDate = new Date(checkDate);
    const dummy =  checkDate.valueOf() >= dateFrom.valueOf() && checkDate.valueOf() <= dateTo.valueOf();
    console.log(dummy);
    return dummy;
}