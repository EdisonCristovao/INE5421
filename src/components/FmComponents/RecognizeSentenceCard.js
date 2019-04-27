import React, { Component } from "react";
import { connect } from "react-redux";
import { CardText, Card, CardBody, CardTitle, Input, Alert } from "reactstrap";
import { addSentence, removeSentence } from "../../actions";

class RecognizeSentenceCard extends Component {
  state = {
    sentence: ""
  };
  submitSentence = e => {
    if (e.key === "Enter") {
      this.props.addSentence(this.state.sentence);
      this.setState({ sentence: "" });
    }
  };
  render() {
    const { removeSentence, language } = this.props;
    const { userSentences } = language;
    const { sentence } = this.state;
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>
              <h1>Reconhecimento de Sentenças</h1>
            </CardTitle>
            <CardText>
              {userSentences.map((sentec, index) => (
                <Alert
                  color={sentec.valid ? `success` : `danger`}
                  isOpen={true}
                  toggle={() => {
                    removeSentence(index);
                    this.forceUpdate();
                  }}
                >
                  {sentec.sentence}
                </Alert>
              ))}
              <Input
                value={sentence}
                onKeyPress={e => this.submitSentence(e)}
                onChange={e => this.setState({ sentence: e.target.value })}
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
  return { language: listLanguages[selectedLanguage] };
};

export default connect(
  mapState,
  { addSentence, removeSentence }
)(RecognizeSentenceCard);
