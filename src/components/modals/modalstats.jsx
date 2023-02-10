import React from 'react';
import './modal.scss';
import './modalstats.css';

const ModalStats = ({ openStats, setOpenStats }) => {
    return (
        <div className={`overlay animated ${openStats ? 'show' : ''}`} onClick={() => setOpenStats(false)}>
            <div className="modal" onClick={e => e.stopPropagation()} >
                <div className='headWrapper'>
                    <div className='headerTDiv'>statistics</div>
                    <div className='headerIDiv'>
                        <i className="fa fa-times" aria-hidden="true" onClick={() => setOpenStats(false)}></i>
                    </div>
                </div>
                <div className='stats'>
                    <div className='statContainer'>
                        <div className='statProp'>{localStorage.getItem("totalGames")}</div>
                        <div className='statLabel'>total</div>
                    </div>
                    <div className='statContainer'>
                        <div className='statProp'>{localStorage.getItem("goodGames")}</div>
                        <div className='statLabel'>victories</div>
                    </div>
                    <div className='statContainer'>
                        <div className='statProp'>{((parseInt(localStorage.getItem("goodGames")) / parseInt(localStorage.getItem("totalGames"))) * 100).toPrecision(3)}%</div>
                        <div className='statLabel'>winrate</div>
                    </div>
                    <div className='statContainer'>
                        <div className='statProp'>{(parseInt(localStorage.getItem("totalGuesses")) / parseInt(localStorage.getItem("totalGames"))).toPrecision(3)}</div>
                        <div className='statLabel'>average guesses</div>
                    </div>
                </div>
                <div className='footWrapper'>
                </div>
            </div>
        </div>
    )
}

export default ModalStats;