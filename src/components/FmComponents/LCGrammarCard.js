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
import Grammar from './../../model/Grammar'

class RegularGrammarCard extends Component {


  render() {
    const { language, changeRegGramma } = this.props;
    let gramma = new Grammar();
    gramma = gramma.stringToGrammar(language.grammar);

    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>
                <h1>Gramática LLC</h1>
            </CardTitle>
            <CardText>
              <Input
                style={{height: 265}}
                type="textarea"
                row="5"
                name="gr"
                placeholder="Defina uma GR"
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
  return { language: { ...listLanguages[selectedLanguage] } };
};

export default connect(
  mapState,
  // null,
  { changeRegGramma }
)(RegularGrammarCard);
