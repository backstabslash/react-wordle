import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './tile.css';

function Tile({ id, value, className }) {
    const [letter, setLetter] = React.useState(value);
    const [color, setColor] = React.useState(className);
    useEffect(() => {
        setLetter(value);
    }, [value]);
    useEffect(() => {
        setColor(className);
    }, [className]);
    return (
        <div className={`tile ${color}`} id={id} > {letter}</div >)
};

Tile.propTypes = {
    id: PropTypes.number,
    value: PropTypes.string,
}

export default Tile;