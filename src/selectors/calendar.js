import { createSelector } from 'reselect';
import { convertToJS } from '../helpers/selector';

export const rootCalendarState = createSelector(
    state => state.calendar,
    calendar => calendar
);

export const calendarWeekState = createSelector(
    rootCalendarState,
    calendar => {
        return convertToJS(calendar.get('week'))
    }
);

export const calendarVisibleMonthState = createSelector(
    rootCalendarState,
    calendar => convertToJS(calendar.get('visibleMonthList'))
);

export const calendarActiveDateState = createSelector(
    rootCalendarState,
    calendar => convertToJS(calendar.get('activeDate'))
);