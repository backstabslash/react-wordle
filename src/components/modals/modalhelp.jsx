import React from 'react';
import './modalhelp.scss';

const ModalHelp = ({ open, setOpen }) => (
    <div className={`overlay animated ${open ? 'show' : ''}`} onClick={() => setOpen(false)}>
        <div className="modal" onClick={e => e.stopPropagation()} >
            <div className='headWrapper'>
                <div className='headerTDiv'>yalp ot woh</div>
                <div className='headerIDiv'>
                    <i className="fa fa-times" aria-hidden="true" onClick={() => setOpen(false)}></i>
                </div>
            </div>
            <span className='helpSpan'><br />.seirt 6 ni drow neddih eht sseug
                <br /><br />.sseug eht timbus ot nottub retne eht tih .srettel modnar retne tonnac uoy ,drow rettel 5 dilav a eb tsum sseug hcae
                <br /><br />.woleb selpmaxe eht ni sa egnahc lliw selit eht fo roloc eht ,noissimbus ruoy retfa
                <br /><br />:selpmaxe<br /><br />
            </span>
        </div>
    </div>
)

export default ModalHelp;