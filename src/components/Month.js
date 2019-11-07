import React from 'react';
import {getOnlyThreeMethods} from '../helpers/calendar/methods';
import Day from './Day';

/**
 * Month component
 *
 * @param {Object} props
 */

export default function Month(props) {
    let {activeDate, visibleMonths, setActiveData} = props,
        {activeMonth} = getOnlyThreeMethods(activeDate, visibleMonths),
        activeDay = false;

    let changeActiveDay = (dd, mm, yyyy) => {
        let updatedData = new Date(dd + ' ' + mm + ' ' + yyyy);
        setActiveData(updatedData);
    };

    return (
        <div className="year-inner-component">
            <ul className={'year-root-container'}>
                {activeMonth.map((item, index) => {
                    activeDay = activeDate.day === item.value && activeDate.month === item.month;

                    let propsData = {
                        activeDay,
                        changeActiveDay,
                        item
                    };

                    return (
                        <Day propsData={propsData} key={item.month + '_' + index} />
                    )
                })}
            </ul>
        </div>
    );
}