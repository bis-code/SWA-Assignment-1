export function isSameDay(date1, date2) {
    const convertedDate1 = new Date(date1);
    const convertedDate2 = new Date(date2);
    return convertedDate1.toDateString() === convertedDate2.toDateString();
}