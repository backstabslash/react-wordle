import React from 'react';
import PropTypes from 'prop-types';
import Key from './key'
import './board.css';

function Board({ onClick, keycolors }) {
    let i = 0;
    return (
        <div className="board">
            <div className='keyboardArea'>
                <div className='row'> {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                        className={keycolors[i++]}
                    />
                ))}
                </div>
                <div className='row'> {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '⌫'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                        className={keycolors[i++]}
                    />
                ))}
                </div>
                <div className='row'> {['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⏎'].map((key) => (
                    <Key
                        value={key}
                        key={key}
                        onClick={onClick}
                        className={keycolors[i++]}
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