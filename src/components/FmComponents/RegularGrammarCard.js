import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CardText,
  Card,
  CardBody,
  CardTitle,
  Input,
} from "reactstrap";
import { changeRegGramma } from "../../actions/Language";

class RegularGrammarCard extends Component {

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps, '<-----');
    return true;
  }

  render() {
    const { listLanguages, selectedLanguage, changeRegGramma } = this.props;
    const language = listLanguages[selectedLanguage];
    console.log(language, "<REGGRAMA");
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>
              <h1>Gramatica Regular</h1>
            </CardTitle>
            <CardText>
              <Input
                type="textarea"
                row="5"
                name="gr"
                placeholder="Defina uma ER"
                value={language.grammar}
                onChange={e => {
                  changeRegGramma(e.target.value);
                  this.forceUpdate();
                }}
              />
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapState = ({ languages }) => {
  const { listLanguages, selectedLanguage } = languages;
  return { listLanguages, selectedLanguage };
};

export default connect(
  mapState,
  { changeRegGramma }
)(RegularGrammarCard);
