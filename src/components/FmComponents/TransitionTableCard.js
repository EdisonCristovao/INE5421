import React, { Component } from "react";
import {
  CardText,
  Card,
  CardBody,
  CardTitle,
  Input,
  Tooltip
} from "reactstrap";
import { connect } from "react-redux";

class TransitionTable extends Component {
  state = {
    fsm: this.props.language.fsm
  };

  getNextState = (state, letter, transitions) => {
    const transition = transitions.find(
      tran => tran.from === state && tran.when == letter
    );
    if (transition === undefined) return <td>{"-"}</td>;
    else return <td>{transition.to}</td>;
  };

  render() {
    const { fsm } = this.state;
    console.log(fsm);
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>
              <h1>Altomato Finito</h1>
            </CardTitle>
            <CardText>
              <table className="default-table table table-sm table-responsive-sm table-hover">
                <thead className="th-border-b">
                  <tr>
                    <th>
                      <i class="zmdi zmdi-arrow-right" />
                    </th>
                    <th>F</th>
                    <th>Estado</th>
                    {fsm.alphabet.map((letter, index) => (
                      <th>{letter}</th>
                    ))}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {fsm.states.map((state, index) => (
                    <tr>
                      <td>S</td>
                      <td>N</td>
                      <td>{state}</td>
                      {fsm.alphabet.map((letter, index) =>
                        this.getNextState(state, letter, fsm.transitions)
                      )}
                      <td />
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default connect(mapState)(TransitionTable);
