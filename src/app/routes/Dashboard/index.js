import React from "react";
import { connect } from "react-redux";
import ContainerHeader from "components/ContainerHeader/index";
import IntlMessages from "util/IntlMessages";

import {
  CardText,
  Card,
  CardBody,
  CardTitle,
  Input,
  Alert,
  Button
} from "reactstrap";
import RegularExpressionCard from "../../../components/FmComponents/RegularExpressionCard";
import TransitionTableCard from "../../../components/FmComponents/TransitionTableCard";
import RecognizeSentenceCard from "../../../components/FmComponents/RecognizeSentenceCard";
import RecognizeSentenceLCCCard from "../../../components/FmComponents/RecognizeSentenceLCCCard";
import RegularGrammarCard from "../../../components/FmComponents/RegularGrammarCard";
import LCGrammarCard from "../../../components/FmComponents/LCGrammarCard";

class Dashboard extends React.Component {
  render() {
    const { language, selectedLanguage } = this.props;

    return (
      <div>
        {selectedLanguage !== null && language.type === 1 && (
          <div className="app-wrapper">
            <div className="row">
              <div className="col-md-8 col-12">
                <TransitionTableCard />
              </div>
              <div className="col">
                <RecognizeSentenceCard />
              </div>
            </div>
            <div className="row">
              <div className="row col-8">
                <div className="col-6">
                  <RegularExpressionCard />
                </div>
                <div className="col-6">
                  <RegularGrammarCard />
                </div>
              </div>
              <div className="col-4" />
            </div>
          </div>
        )}

        {selectedLanguage !== null && language.type === 2 && (
          <div className="app-wrapper">
            <div className="row">
              <div className="col-md-8">
                <LCGrammarCard />
              </div>
              <div className="col">
                <RecognizeSentenceLCCCard />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapState = ({ languages }) => {
  const { listLanguages, selectedLanguage } = languages;
  return { language: listLanguages[selectedLanguage], selectedLanguage };
};

export default connect(mapState)(Dashboard);
