import React from 'react';
import PropTypes from 'prop-types';
import ModalHelp from '../modals/modalhelp';
import ModalSettings from '../modals/modalsettings';
import ModalStats from '../modals/modalstats';
import './header.css';

function Header({ onChangeMode }) {
    const [openHelp, setOpenHelp] = React.useState(false);
    const [openSettings, setOpenSettings] = React.useState(false);
    const [openStats, setOpenStats] = React.useState(false);
    return (
        <div className="headerWrapper">
            <div className='helpDiv'>
                <i className="fa-solid fa-question" onClick={() => setOpenHelp(true)}></i>
                <ModalHelp openHelp={openHelp} setOpenHelp={setOpenHelp} />
                <ModalSettings openSettings={openSettings} setOpenSettings={setOpenSettings} onChangeMode={onChangeMode} />
                <ModalStats openStats={openStats} setOpenStats={setOpenStats} />
            </div>
            <div className='titleDiv'>
                eldrow
            </div>
            <div className='persDiv'>
                <i className="fa-solid fa-ellipsis-vertical" onClick={() => setOpenSettings(true)}></i>
                <i className="fa-regular fa-chart-bar" onClick={() => setOpenStats(true)}></i>
            </div>
        </div >)
};

Header.propTypes = {
    onChangeMode: PropTypes.func
}

export default Header;