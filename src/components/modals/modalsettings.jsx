import React from 'react';
import './modal.scss';
import './modalsettings.css';

const ModalSettings = ({ openSettings, setOpenSettings }) => (
    <div className={`overlay animated ${openSettings ? 'show' : ''}`} onClick={() => setOpenSettings(false)}>
        <div className="modal" onClick={e => e.stopPropagation()} >
            <div className='headWrapper'>
                <div className='headerTDiv'>settings</div>
                <div className='headerIDiv'>
                    <i className="fa fa-times" aria-hidden="true" onClick={() => setOpenSettings(false)}></i>
                </div>
            </div>
        </div>
    </div>
)

export default ModalSettings;