import React from 'react';
import PropTypes from 'prop-types';
import Row from './row';
import './grid.css';

function Grid({ array }) {
    let i = 0;
    return (
        <div className="grid">
            <div className='gameArea'>
                {[...array].map((key) => (
                    <Row
                        id={i}
                        key={i}
                        values={array[i++]}
                    />
                ))}

            </div>
        </div>
    )
};

Grid.propTypes = {
    array: PropTypes.array,
}

export default Grid;