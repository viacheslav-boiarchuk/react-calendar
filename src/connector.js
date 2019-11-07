import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
    calendarWeekState,
    calendarVisibleMonthState,
    calendarActiveDateState
} from './selectors/calendar';

import {
    setActiveData
} from './actions';

export const AppConnector = connect(state => state);

export const calendarConnector = connect(() => {return {}}, {
    setActiveData: (payload) => setActiveData(payload),
});

const navigationState = createSelector(
    [calendarActiveDateState],
    (calendarActiveDateState) => {
        return ({
            activeDate: calendarActiveDateState
        });
    }
);

export const navigatorConnector = connect(navigationState, {
    setActiveData: (payload) => setActiveData(payload),
});

const weekNameState = createSelector(
    [calendarWeekState],
    (calendarWeekState) => {
        return ({
            week: calendarWeekState
        });
    }
);

export const weekNameConnector = connect(weekNameState, null);


const monthsState = createSelector(
    [calendarVisibleMonthState, calendarActiveDateState],
    (calendarVisibleMonthState, calendarActiveDateState) => {
        return ({
            visibleMonths: calendarVisibleMonthState,
            activeDate: calendarActiveDateState
        });
    }
);

export const monthsConnector = connect(monthsState, {
    setActiveData: (payload) => setActiveData(payload),
});