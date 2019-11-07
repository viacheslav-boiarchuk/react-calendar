import React from 'react';

/**
 * Day component
 *
 * @param {Object} props
 */

export default function Day(props) {
    let {item, activeDay, changeActiveDay} = props.propsData,
        activeDayClass = activeDay ? 'active-day' : '',
        {month, position, value, year} = item;

    return (
        <li className={'day-cell' + ' ' + month + ' ' + position + ' ' + activeDayClass}
            onClick={() => changeActiveDay(value, month, year)}>
            {value}
        </li>
    );
}