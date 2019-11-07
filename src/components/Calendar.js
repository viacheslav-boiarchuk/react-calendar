import React, { useEffect } from 'react';

import Navigation from './Navigation';
import Month from './Month';
import WeekName from './WeekName';

import {
    navigatorConnector,
    weekNameConnector,
    monthsConnector
} from '../connector';

const WeekNameConnected = weekNameConnector(WeekName);
const MonthConnected = monthsConnector(Month);
const NavigationConnected = navigatorConnector(Navigation);

/**
 * Calendar component
 *
 * @param {Object} props
 */

export default function Calendar(props) {
    let {setActiveData} = props;

    useEffect( () => {
        setActiveData();
    });

    return (
        <div className="calendar-wrapper">
            <NavigationConnected />
            <WeekNameConnected />
            <MonthConnected />
        </div>
    );
}
