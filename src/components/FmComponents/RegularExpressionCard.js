import React, { Component } from "react";
import { connect } from "react-redux";

import {
  CardText,
  Card,
  CardBody,
  CardTitle,
  Input,
  Alert,
  Button
} from "reactstrap";
import { changeRegExpression } from "../../actions/Language";

class RegularExpression extends Component {

  render() {
    const { listLanguages, selectedLanguage, changeRegExpression } = this.props;
    let language = listLanguages[selectedLanguage];
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>
              <h1>Expressão Regular</h1>
            </CardTitle>
            <CardText>
              <Input
                type="text"
                name="er"
                disabled
                // placeholder="Defina uma ER"
                placeholder="Breve ...."
                value={language.expression}
                onChange={e => {
                  changeRegExpression(e.target.value);
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
  { changeRegExpression }
)(RegularExpression);
