import { List, Map} from 'immutable';
import * as ct from '../actions/constants';
import {generateVisibleMonthList, getActiveData} from '../helpers/calendar/methods';

const initialState = Map({
    visibleMonthList: List.of(),
    activeDate: Map({
        day: '',
        month: '',
        year: '',
        fullTime : '',
        monthIndex: ''
    }),
    week: List([
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ]),
});

export const calendar = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ct.SET_ACTIVE_DATA:
            let {dd, mm, yyyy, fullTime, monthIndex} = getActiveData(payload),
                updatedCalendar = generateVisibleMonthList(fullTime);

            return state
                .setIn(['activeDate', 'day'], dd)
                .setIn(['activeDate', 'month'], mm)
                .setIn(['activeDate', 'year'], yyyy)
                .setIn(['activeDate', 'fullTime'], fullTime)
                .setIn(['activeDate', 'monthIndex'], monthIndex)
                .set('visibleMonthList', updatedCalendar);
        default:
            return state;
    }
};