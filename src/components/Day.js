import React from 'react';
import {getOnlyThreeMethods} from '../helpers/calendar/methods';

/**
 * Year component
 *
 * @param {Object} props
 */

export default function Month(props) {
    let {activeDate, visibleMonths} = props,
        {activeMonth} = getOnlyThreeMethods(activeDate, visibleMonths);

    console.log(props);

    return (
        <div className="year-inner-component">
            <ul className={'year-root-container'}>
                {activeMonth.map((item, index) => {
                    return (
                        <li className={'day-cell' + ' ' + item.month + ' ' + item.position} key={item.month + '_' + index}>
                            {item.value}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}