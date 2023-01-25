import React from 'react';
import PropTypes from 'prop-types';
import Key from './key'
import './board.css';

function Board({ onClick }) {
    return (
        <div className="board">
            <div className='keyboardArea'>
                <div className='row'> {['P', 'O', 'I', 'U', 'Y', 'T', 'R', 'E', 'W', 'Q'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                    />
                ))}
                </div>
                <div className='row'> {['L', 'K', 'J', 'H', 'G', 'F', 'D', 'S', 'A', '⌫'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                    />
                ))}
                </div>
                <div className='row'> {['M', 'N', 'B', 'V', 'C', 'X', 'Z', '⏎'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                    />
                ))}
                </div>
            </div>
        </div>
    )
};

Board.propTypes = {
    onClick: PropTypes.func,
}


export default Board;