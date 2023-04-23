var DateAddDays = function (start, days) {

    let date = new Date(start.valueOf());
    date.setDate(date.getDate() + days);

    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    
    return month + "/" + day + "/" + year;
    
    };

Stimulsoft.Report.Dictionary.StiFunctions.addFunction("Custom", "DateAddDays", "DateAddDays", "DateAddDays", "", Date, "Returns a Date", [Date, Number], ["Date, Number"], ["Pass in Date and Number of Days to add"], DateAddDays);

var DateSubtractDays = function (start, days) {

    let date = new Date(start.valueOf());
    date.setDate(date.getDate() - days);

    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    
    return month + "/" + day + "/" + year;
    
    };

Stimulsoft.Report.Dictionary.StiFunctions.addFunction("Custom", "DateSubtractDays", "DateSubtractDays", "DateSubtractDays", "", Date, "Returns a Date", [Date, Number], ["Date, Number"], ["Pass in Date and Number of Days to subtract"], DateSubtractDays);

var DateDaysDiff = function (start, end) {

    let date1 = new Date(start.valueOf());
    let date2 = new Date(end.valueOf());
    
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
   
    return Difference_In_Days;
    
    };

Stimulsoft.Report.Dictionary.StiFunctions.addFunction("Custom", "DateDaysDiff", "DateDaysDiff", "DateDaysDiff", "", Number, "Returns a integer", [Date, Date], ["Start Date, End Date"], ["Pass in two Dates"], DateDaysDiff);

var TimeHours = function (time) {
    // GOOD FORMAT 5.01:00:00
    // BAD FORMAT 20:12:37.7538601  DECIMAL SECONDS
       

    var hoursMinutes = time.split(/[.:]/);
    var hours = 0;
    var minutes = 0;

    // REMOVE ANY DECIMAL SECONDS
    if (time.lastIndexOf('.') > time.lastIndexOf(':')) {
        hoursMinutes.splice(-1);
    }

    if (hoursMinutes.length >= 4) {
    // days:hours:minutes:seconds format
        hours = parseInt(hoursMinutes[0], 10)*24;
        hours = hours + parseInt(hoursMinutes[1], 10);
        minutes = hoursMinutes[2] ? parseInt(hoursMinutes[2], 10) : 0;
        return hours + minutes / 60;
    } else if (hoursMinutes.length === 3)
    {
        // hours:minutes:seconds format
        hours = parseInt(hoursMinutes[0], 10);
        minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        return hours + minutes / 60;
    } else
    {
        return "";
    }

    };

Stimulsoft.Report.Dictionary.StiFunctions.addFunction("Custom", "TimeHours", "TimeHours", "TimeHours", "", Number, "Returns a decimal", [Date], ["DD:HH:MM"], ["Pass in DD:HH:MM"], TimeHours);

var GetInitials = function (name) {

    var parts = name.split(' ')
    var initials = ''
    for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0]
        }
    }
    return initials

    };

Stimulsoft.Report.Dictionary.StiFunctions.addFunction("Custom", "GetInitials", "GetInitials", "GetInitials", "", String, "Returns name initials", [String], ["John Doe"], ["Pass in Name"], GetInitials);

var InStr = function (A, B) {

    pos = A.indexOf(B);
    if (A.length === 0||B.length === 0) {pos = -1}
    return pos

    };

Stimulsoft.Report.Dictionary.StiFunctions.addFunction("Custom", "InStr", "InStr", "InStr", "", Number, "Returns position of B in A", [String, String], ["A, B"], ["Pass two strings"], InStr);



