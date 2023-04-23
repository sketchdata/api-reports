// Returns the ISO week of the date.
// From top answer because it was easy and seems to work: https://stackoverflow.com/questions/9045868/javascript-date-getweek
Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date = typeof(date) == 'number' ? date : 0; //default date to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - date; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            debugger;
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - date;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
                the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};
// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function() {
    var date = new Date(this.getTime());
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    return date.getFullYear();
}