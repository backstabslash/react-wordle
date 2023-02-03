import React from 'react';
import PropTypes from 'prop-types';
import Row from './row';
import './grid.css';

function Grid({ letters, colors, rows }) {
    let i = 0;
    return (
        <div className="grid">
            <div className='gameArea'>
                {[...letters].map((key) => (
                    <Row
                        id={i}
                        key={i}
                        rowInvalid={rows[i]}
                        values={letters[i]}
                        colors={colors[i++]}
                    />
                ))}

            </div>
        </div>
    )
};

Grid.propTypes = {
    letters: PropTypes.array,
    colors: PropTypes.array,
    rowInvalid: PropTypes.array,
}

export default Grid;