import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './tile.css';

function Tile({ id, value }) {
    const [letter, setLetter] = React.useState(value);
    useEffect(() => {
        setLetter(value);
    });

    return (
        <div className='tile' id={id}>{letter}</div>)
};

Tile.propTypes = {
    value: PropTypes.string,
}

export default Tile;