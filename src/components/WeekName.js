import React from 'react';

/**
 * Week component
 *
 * @param {Object} props
 */

export default function Week(props) {

    const {week} = props;
    return (
        <div className="week-inner-component">
            <ul>
                {week.map((item,key) => <li key={item+'_'+key}>{item}</li>)}
            </ul>
        </div>
    );
}
