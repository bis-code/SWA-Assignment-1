export function isSameDay(date1, date2) {
    const convertedDate1 = new Date(date1);
    const convertedDate2 = new Date(date2);
    return convertedDate1.toDateString() === convertedDate2.toDateString();
}

export function addHoursToDate(date, hours) {
    const dateObj = new Date(date);
    return new Date(dateObj.setHours(dateObj.getHours() + hours));
}

export function isDateBetween(checkDate, dateFrom, dateTo) {
    checkDate = new Date(checkDate);
    return checkDate.valueOf() >= dateFrom.valueOf() && checkDate.valueOf() <= dateTo.valueOf();
}

export function dateIsLastDayFromCurrentDay(dateToCheck) {
    let currentDate = new Date();
    const oneDayInMillis = 24 * 60 * 60 * 1000;
    currentDate = new Date(currentDate.getTime() - oneDayInMillis);
    console.log(currentDate);

    const dateToCheckObj = new Date(dateToCheck);
    const currentDateObj = new Date(currentDate);

    const isBeforeWithDate = dateToCheckObj.getDate() < currentDateObj.getDate();
    if (isBeforeWithDate) {
        return currentDateObj.getDate() - dateToCheckObj.getDate() === 1;
    }
}