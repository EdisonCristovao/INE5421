import React from "react";
import { connect } from "react-redux";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  ButtonGroup,
  FormGroup,
  Label
} from "reactstrap";
import Fsm from "./../../../model/Fsm";
import { unionIntersectLanguage, UNION, INTERSECT } from "./../../../actions/Language";

class ModalUnionIntersect extends React.Component {
  state = {
    modal: false,

    rSelected: null,
    languageToOp: null
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      rSelected: null,
      languageToOp: null
    }));
    this.forceUpdate();
  };

  getNextState = (state, letter, transitions) => {
    const transition = transitions.find(
      tran => tran.from === state && tran.when == letter
    );
    if (transition === undefined) return <td>{"-"}</td>;
    else return <td>{transition.to}</td>;
  };

  render() {
    const { rSelected, languageToOp } = this.state;
    const { language, listLanguages } = this.props;
    return (
      <div>
        <li className="pointer" onClick={this.toggle}>
          <div className="d-flex align-items-center">
            {/* <i className={`flag flag-24 flag-${icon}`} /> */}
            <h4 className="mb-0 ml-2">Chomsky</h4>
          </div>
        </li>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader >Forma normal de Chomsky</ModalHeader>
          <ModalBody> 
            {/* Body Here. */}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => { this.toggle(); this.props.makeNewLanguageDet(detFsm) }}>Criar nova linguagem</Button>
            <Button color="secondary" onClick={this.toggle}>Voltar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const mapState = ({ languages }) => {
  const { listLanguages, selectedLanguage } = languages;
  return { language: listLanguages[selectedLanguage], listLanguages };
};

export default connect(mapState, { unionIntersectLanguage })(ModalUnionIntersect);
