let yearsData = [
    {month: 'January',      days: 31},
    {month: 'February',     days: 28},
    {month: 'March',        days: 31},
    {month: 'April',        days: 30},
    {month: 'May',          days: 31},
    {month: 'June',         days: 30},
    {month: 'July',         days: 31},
    {month: 'August',       days: 31},
    {month: 'September',    days: 30},
    {month: 'October',      days: 31},
    {month: 'November',     days: 30},
    {month: 'December',     days: 31}
];

/**
 * Function, which check leap year
 *
 * @param {Number} year - year
 * @returns {Boolean} return flag, depending of the year
 */

function leapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}


/**
 * Function, which depending on the year, updated calendar with appropriate february days
 *
 * @param {Number} year - year
 * @returns {Object} return updated year
 */

function updateCalendar(year) {
    let resArr = [...yearsData];
    resArr[1] = {
        month: yearsData[1].month,
        days: leapYear(year) ? 29 : 28
    };
    return resArr;
}

/**
 * Function, which generate calendar list
 *
 * @param {Number} year - current active year on calendar
 * @returns {Object} return years list
 */

export function generateVisibleMonthList(year) {
    let currentYear = year ? parseInt(year.split(' ')[2]): new Date().getFullYear() ,
        yearsList = [];

    for (let i = -1; i < 2; i++) {
        let tempYear = currentYear + i;
        yearsList.push({
            year: tempYear,
            months: updateCalendar(tempYear)
        })
    }

    return yearsList
}

/**
 * Function, which return data about 'active' Date
 *
 * @param {Object} date - current active year on calendar
 * @returns {Object} return active year
 */
export function getActiveData(date = new Date()) {
    let today = date,
        dd = today.getDate(),
        mm = yearsData[today.getMonth()]['month'],
        yyyy = today.getFullYear(),
        fullTime = dd + " " + mm + " " + yyyy,
        monthIndex = today.getMonth();

    return {
        dd,
        mm,
        yyyy,
        fullTime,
        monthIndex
    }
}

/**
 * Function, which return full current month with prev and next month if they should be render also
 * and update this months for rendering
 *
 * @param {Object} activeDate - current active year on calendar
 * @param {Object} visibleMonths - prev, next and current year object
 * @returns {Object}
 */

export function getOnlyThreeMethods(activeDate, visibleMonths) {
    let activeMonth,
        monthsList = [],
        firstDayIndex = 0,
        {month, year} = activeDate,
        flag = false;

    for(let i = 0; i < visibleMonths.length; i++) {
        if (flag) {break;}
        else if (visibleMonths[i].year === year) {
            let yearCalendar = visibleMonths[i].months;
            for (let j = 0; j < yearCalendar.length; j++) {
                if (flag) {break;}
                else if (yearCalendar[j].month === month) {
                    firstDayIndex = _getFirstDayFromWeek(j, visibleMonths[i].year);

                    monthsList.push((j === 0) ? {
                        year: visibleMonths[i-1].year,
                        monthData: visibleMonths[i-1].months[11]
                    } : {
                        year: visibleMonths[i].year,
                        monthData: visibleMonths[i].months[j-1]
                    });

                    monthsList.push({
                        year: visibleMonths[i].year,
                        monthData: yearCalendar[j]
                    });

                    monthsList.push((j === 11) ? {
                        year: visibleMonths[i+1].year,
                        monthData: visibleMonths[i+1].months[0]
                    } : {
                        year: visibleMonths[i].year,
                        monthData: visibleMonths[i].months[j+1]
                    });

                    flag = true;
                }
            }
        }
    }

    activeMonth = _reArrangeList(monthsList, firstDayIndex);

    return {
        activeMonth,
        monthsList,
        firstDayIndex
    };

}

/**
 * Function, which return same month, but re-arranged for convenient rendering -> 7 days per row
 *
 * @param {Object} monthsList - our months list
 * @param {Number} firstDayIndex - value from which date start previous month
 * @returns {Object} updatedMonth
 */

function _reArrangeList(monthsList, firstDayIndex) {
    let updatedMonth = [],
        i = 0,
        m = 1;

    for (let p = firstDayIndex; p > 0; p--) {

        updatedMonth.unshift({
            month: monthsList[0].monthData.month,
            value: monthsList[0].monthData.days - i,
            position: 'previous',
            year: monthsList[0].year
        });
        i++;
    }

    if (monthsList[1] && monthsList[2]) {
        for (let z = 1; z <= monthsList[1].monthData.days; z++) {
            updatedMonth.push({
                month: monthsList[1].monthData.month,
                value: z,
                position: 'current',
                year: monthsList[1].year
            });
        }

        for (let j = updatedMonth.length; j < 42; j++) {
            updatedMonth.push({
                month: monthsList[2].monthData.month,
                value: m,
                position: 'next',
                year: monthsList[2].year
            });
            m++;
        }
    }

    return updatedMonth;
}

/**
 * Function, which return from which day index month start
 *
 * @param {Object} monthIndex - month index
 * @param {Number} year - year
 * @returns {Number}
 */

function _getFirstDayFromWeek(monthIndex, year) {
    return new Date(`${year}-${monthIndex + 1}-01`).getDay();
}


/**
 * Function, which return new Data depends of new month
 *
 * @param {String} monthState - month index
 * @param {Number} monthIndex
 * @param {Object} activeDate
 * @returns {Object}
 */

export function moveMonth (monthState, monthIndex, activeDate) {
    const {day, year} = activeDate;
    let newMonthIndex = 0,
        newYear = year;

    switch (monthState) {
        case 'prev':
            if (monthIndex === 0) {
                newMonthIndex = 11;
                newYear--;
            }
            else {
                newMonthIndex = monthIndex - 1;
            }
            break;
        case 'next':
            if (monthIndex === 11) {
                newMonthIndex = 0;
                newYear++;
            }
            else {
                newMonthIndex = monthIndex + 1;
            }
            break;
        default:
            break;
    }

    return new Date(day + ' ' + yearsData[newMonthIndex].month + ' ' + newYear);
}