import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import './key.css';

function Key({ value, onClick, className }) {
    const [color, setColor] = React.useState(className);
    useEffect(() => {
        setColor(className);
    }, [className]);
    return (
        <>
            {value !== '⏎' && <div className={`key ${color}`} onClick={() => { onClick({ value }) }}> {value}</div >}
            {value === '⏎' && <div className='keyEnter' onClick={() => { onClick({ value }) }}> {value}</div >}
        </>
    )
};

Key.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
}

export default Key;