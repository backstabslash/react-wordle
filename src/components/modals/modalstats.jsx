import React from 'react';
import './modal.scss';
import './modalstats.css';

const ModalStats = ({ openStats, setOpenStats }) => (
    <div className={`overlay animated ${openStats ? 'show' : ''}`} onClick={() => setOpenStats(false)}>
        <div className="modal" onClick={e => e.stopPropagation()} >
            <div className='headWrapper'>
                <div className='headerTDiv'>statistics</div>
                <div className='headerIDiv'>
                    <i className="fa fa-times" aria-hidden="true" onClick={() => setOpenStats(false)}></i>
                </div>
            </div>
        </div>
    </div>
)

export default ModalStats;