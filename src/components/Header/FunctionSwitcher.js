import React from "react";
import CustomScrollbars from "util/CustomScrollbars";
import ModalAutoDeterministic from "./modal/modalAutoDeterministic";
import ModalMinimize from "./modal/modalMinimize";

class FunctionSwitcher extends React.Component {
  render() {
    return (
      <CustomScrollbars
        className="messages-list language-list scrollbar"
        style={{ height: 230 }}
      >
        <ul className="list-unstyled">
          <ModalAutoDeterministic />
          <ModalMinimize />
        </ul>
      </CustomScrollbars>
    );
  }
}

export default FunctionSwitcher;
