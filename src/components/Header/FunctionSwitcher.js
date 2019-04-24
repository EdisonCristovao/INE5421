import React from "react";
import CustomScrollbars from "util/CustomScrollbars";

const FunctionSwitcher = ({ switchLanguage, handleRequestClose }) => {
  return (
    <CustomScrollbars
      className="messages-list language-list scrollbar"
      style={{ height: 230 }}
    >
      <ul className="list-unstyled">
        <li className="pointer">
          <div className="d-flex align-items-center">
            {/* <i className={`flag flag-24 flag-${icon}`} /> */}
            <h4 className="mb-0 ml-2">Determinizar</h4>
          </div>
        </li>
      </ul>
    </CustomScrollbars>
  );
};

export default FunctionSwitcher;
