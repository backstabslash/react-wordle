import React from 'react';
import PropTypes from 'prop-types';
import Tile from './tile';
import './row.css';

function Row({ id, values }) {
    let i = 0;
    return (
        <div className='row'>
            {[...values].map((key) => (
                <Tile
                    id={i}
                    value={key}
                    key={i++}
                />
            ))}
        </div>
    )
};

Row.propTypes = {
    id: PropTypes.number,
    lastLetter: PropTypes.string,
}

export default Row;