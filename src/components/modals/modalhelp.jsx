import React from 'react';
import './modalhelp.scss';
import Tile from '../mainarea/tile'

const ModalHelp = ({ open, setOpen }) => (
    <div className={`overlay animated ${open ? 'show' : ''}`} onClick={() => setOpen(false)}>
        <div className="modal" onClick={e => e.stopPropagation()} >
            <div className='headWrapper'>
                <div className='headerTDiv'>everyone knows dat</div>
                <div className='headerIDiv'>
                    <i className="fa fa-times" aria-hidden="true" onClick={() => setOpen(false)}></i>
                </div>
            </div>
            <span className='helpSpan'><br />guess the hidden word in 6 tries.
                <br /><br />each guess must be a valid 5 letter word, you cannot enter random letters. hit the enter button to submit the guess.
                <br /><br />examples:<br /><br />
                <div className='exampleRow'>
                    <Tile className={"smallTile rightTile"} value={"K"} />
                    <Tile className={"smallTile rightTile"} value={"I"} />
                    <Tile className={"smallTile rightTile"} value={"T"} />
                    <Tile className={"smallTile rightTile"} value={"T"} />
                    <Tile className={"smallTile rightTile"} value={"Y"} />
                    youre right
                </div>
            </span>
        </div>
    </div>
)

export default ModalHelp;