import React from 'react';
import ModalHelp from '../modals/modalhelp';
import './header.css';

function Header() {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="headerWrapper">
            <div className='helpDiv'>
                <a onClick={() => setOpen(true)}><i className="fa-solid fa-question"></i></a>
                <ModalHelp open={open} setOpen={setOpen} />
            </div>
            <div className='titleDiv'>
                eldrow
            </div>
            <div className='persDiv'>
                <i className="fa-solid fa-ellipsis-vertical"></i>
                <i className="fa-regular fa-chart-bar"></i>
            </div>
        </div >)
};

// propTypes
export default Header;