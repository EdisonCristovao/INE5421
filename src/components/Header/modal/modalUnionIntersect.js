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
      modal: !prevState.modal
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
    const { language, listLanguages } = this.props;
    return (
      <div>
        <li className="pointer" onClick={this.toggle}>
          <div className="d-flex align-items-center">
            {/* <i className={`flag flag-24 flag-${icon}`} /> */}
            <h4 className="mb-0 ml-2">União Interseção</h4>
          </div>
        </li>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader >Automato Determinizado</ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center">
              <div className="d-flex align-itens-center p-3">
                <ButtonGroup>
                  <Button color="primary" onClick={() => this.setState({rSelected: UNION})} active={this.state.rSelected === UNION}>União</Button>
                  <Button color="primary" onClick={() => this.setState({rSelected: INTERSECT})} active={this.state.rSelected === INTERSECT}>Interseção</Button>
                </ButtonGroup>
              </div>

              <FormGroup className="ml-3">
                <Label for="exampleSelect">Selecione a linguagem para operação.</Label>
                <Input type="select" name="selectLinguage" onClick={(e)=> this.setState({languageToOp: e.target.value})}>
                  {listLanguages.map((language , index) =>
                    <option key={index} value={language.id}>{language.name}</option>
                  )}
                </Input>
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => { this.toggle(); this.props.unionIntersectLanguage(language, this.state.rSelected, this.state.languageToOp) }}>Criar nova linguagem</Button>
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
