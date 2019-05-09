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


  render() {
    const { language, changeRegGramma } = this.props;
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
  return { language: {...listLanguages[selectedLanguage]} };
};

export default connect(
  mapState,
  // null,
  { changeRegGramma }
)(RegularGrammarCard);
