import React from 'react';
import {moveMonth} from '../helpers/calendar/methods';

/**
 * Navigation component
 *
 * @param {Object} props
 */

export default function Navigation(props) {
    const {activeDate, setActiveData} = props,
        {day, month, year, monthIndex} = activeDate;

    let changeMonth = (monthState) => {
        let updatedData = moveMonth(monthState, monthIndex, activeDate);
        setActiveData(updatedData);
    };

    return (
        <div className="current-date-row">
            <h3>Calendar</h3>
            <div className="flex-container">
                 <span className="arrow prev"
                 onClick={() => changeMonth('prev')}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
                        <g></g>
                        <path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z"></path>
                    </svg>
                </span>
                <div className="current-date">
                    <span>{day}</span>
                    <span>{month}</span>
                    <span>{year}</span>
                </div>
                <span className="arrow next"
                      onClick={() => changeMonth('next')}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 17 17">
                        <g></g>
                        <path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></path>
                    </svg>
                </span>
            </div>
        </div>
    );
}
