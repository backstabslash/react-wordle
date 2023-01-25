import React from 'react';
import PropTypes from 'prop-types';
import Key from './key'
import './board.css';

function Board({ onClick }) {
    return (
        <div className="board">
            <div className='keyboardArea'>
                <div className='row'> {['p', 'o', 'i', 'u', 'y', 't', 'r', 'e', 'w', 'q'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                    />
                ))}
                </div>
                <div className='row'> {['l', 'k', 'j', 'h', 'g', 'f', 'd', 's', 'a', '⌫'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                    />
                ))}
                </div>
                <div className='row'> {['m', 'n', 'b', 'v', 'c', 'x', 'z', '⏎'].map((key) => (
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