import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './tile.css';

function Tile({ id, value }) {
    const [letter, setLetter] = React.useState(value);
    useEffect(() => {
        setLetter(value);
    }, [value]);

    return (
        <div className='tile' id={id}>{letter}</div>)
};

Tile.propTypes = {
    id: PropTypes.number,
    value: PropTypes.string,
}

export default Tile;