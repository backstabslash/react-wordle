import React from 'react';
import './modalhelp.css';
import './modal.scss'
import Tile from '../mainarea/tile'

const ModalHelp = ({ openHelp, setOpenHelp }) => (
    <div className={`overlay animated ${openHelp ? 'show' : ''}`} onClick={() => setOpenHelp(false)}>
        <div className="modal" onClick={e => e.stopPropagation()} >
            <div className='headWrapper'>
                <div className='headerTDiv'>how to play</div>
                <div className='headerIDiv'>
                    <i className="fa fa-times" aria-hidden="true" onClick={() => setOpenHelp(false)}></i>
                </div>
            </div>
            <span className='helpSpan'><span className='textBlock' style={{ marginTop: 10 }}>guess the hidden word in 6 tries.</span>
                <span className='textBlock'>each guess must be a valid 5 letter word, you cannot enter random letters. hit the enter button to submit the guess.</span>
                <span className='headerLookAlike'>examples:</span>
                <div className='exampleRow'>
                    <Tile className={"smallTile rightTile"} value={"S"} />
                    <Tile className={"smallTile rightTile"} value={"L"} />
                    <Tile className={"smallTile wrongTile"} value={"A"} />
                    <Tile className={"smallTile wrongTile"} value={"S"} />
                    <Tile className={"smallTile wrongTile"} value={"H"} />
                </div>
                S and L are in the word and both in the correct spots.
                <div className='exampleRow'>
                    <Tile className={"smallTile almostTile"} value={"E"} />
                    <Tile className={"smallTile wrongTile"} value={"N"} />
                    <Tile className={"smallTile almostTile"} value={"E"} />
                    <Tile className={"smallTile wrongTile"} value={"M"} />
                    <Tile className={"smallTile wrongTile"} value={"Y"} />
                </div>
                E and E are in the word and both in the wrong spots.
                <div className='exampleRow'>
                    <Tile className={"smallTile rightTile"} value={"W"} />
                    <Tile className={"smallTile rightTile"} value={"H"} />
                    <Tile className={"smallTile wrongTile"} value={"O"} />
                    <Tile className={"smallTile rightTile"} value={"L"} />
                    <Tile className={"smallTile rightTile"} value={"E"} />
                </div>
                O is not in the word in any spot.
            </span>
        </div>
    </div >
)

export default ModalHelp;