import React from "react";
import PropTypes from "prop-types";
import "./modal.scss";
import "./modalsettings.css";

function ModalSettings({ openSettings, setOpenSettings, onChangeMode }) {
  const handleChange = (e) => {
    if (parseInt(localStorage.getItem("curRow")) !== 0) {
      e.preventDefault();
      alert("do not fool me");
    } else onChangeMode(e.target.checked);
  };
  let hardmode = localStorage.getItem("hardmode") || false;
  if (hardmode === "false") hardmode = false;
  else hardmode = true;
  return (
    <div
      className={`overlay animated ${openSettings ? "show" : ""}`}
      onClick={() => setOpenSettings(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="headWrapper">
          <div className="headerTDiv">settings</div>
          <div className="headerIDiv">
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={() => setOpenSettings(false)}
            ></i>
          </div>
        </div>
        <div className="textBlock">
          {" "}
          <span className="text">
            hard mode
            <span className="minitext">
              <br></br>(any revealed hints must be used in subsequent guesses)
            </span>
          </span>
          <label className="switch">
            <input
              type="checkbox"
              onClick={handleChange}
              defaultChecked={hardmode}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

ModalSettings.propTypes = {
  onChangeMode: PropTypes.func,
};

export default ModalSettings;
