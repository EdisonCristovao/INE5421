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
import Grammar from "./../../../model/Grammar";
import {
  makeNewLanguageFromCHomsky,
  UNION,
  INTERSECT
} from "./../../../actions/Language";

class ModalUnionIntersect extends React.Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      rSelected: null,
      languageToOp: null
    }));
    this.forceUpdate();
  };

  render() {
    const { language, listLanguages } = this.props;

    let grammar = new Grammar();
    try {
      grammar = grammar.stringToGrammar(language.grammar).transformToChomsky();
    } catch (e) {}

    return (
      <div>
        <li className="pointer" onClick={this.toggle}>
          <div className="d-flex align-items-center">
            {/* <i className={`flag flag-24 flag-${icon}`} /> */}
            <h4 className="mb-0 ml-2">Chomsky</h4>
          </div>
        </li>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Forma normal de Chomsky</ModalHeader>
          <ModalBody>
            <Input
              style={{ height: 500 }}
              type="textarea"
              disabled
              name="gr"
              placeholder="Defina uma GR"
              value={grammar.gramaToString()}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={e => {
                this.toggle();
                this.props.makeNewLanguageFromCHomsky(
                  language.name + "CHO",
                  grammar.gramaToString()
                );
              }}
            >
              Criar nova linguagem
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Voltar
            </Button>
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

export default connect(
  mapState,
  { makeNewLanguageFromCHomsky }
)(ModalUnionIntersect);
