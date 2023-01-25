import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './key.css';

function Key({ value, onClick }) {
    return (
        <>
            {value !== '⏎' && <div className='key' onClick={() => { onClick({ value }) }}> {value}</div >}
            {value === '⏎' && <div className='keyEnter' onClick={() => { onClick({ value }) }}> {value}</div >}

        </>
    )
};

Key.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
}

export default Key;