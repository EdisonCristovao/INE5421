import React, { Component } from "react";
import { CardText, Card, CardBody, CardTitle, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { fsmEdit } from "../../actions";

class TransitionTable extends Component {
  state = {
    fsm: this.props.language.fsm,
    newState: {
      name: "",
      states: []
      // transitions: []
    },
    newAlphabet: {
      name: ""
    }
  };

  componentWillReceiveProps = nextPorps => {
    this.setState({ ...this.state, fsm: nextPorps.language.fsm });
  };

  getNextState = (state, letter, transitions) => {
    const transition = transitions.find(
      tran => tran.from === state && tran.when == letter
    );
    if (transition === undefined) return <td>{"-"}</td>;
    else return <td>{transition.to}</td>;
  };

  setFinalState = (e, index) => {
    let newState = { ...this.state };
    newState.fsm.finals[index] = !newState.fsm.finals[index];
    this.setState(newState);
  };

  setInitialState = (e, state) => {
    let newState = { ...this.state };
    newState.fsm.initial = state;
    this.setState(newState);
  };

  addTransition = (e, index) => {
    let newState = { ...this.state };
    newState.newState.states[index] = e.target.value;
    this.setState(newState);
  };

  addTransitionsToAutomata = () => {
    let newState = { ...this.state };
    newState.fsm.states = [...newState.fsm.states, newState.newState.name];
    let transitions = [];
    newState.fsm.alphabet.filter((letter, index) => {
      transitions = [
        ...transitions,
        {
          from: newState.newState.name,
          to: newState.newState.states[index],
          when: letter
        }
      ];
    });

    newState.fsm.transitions = [...newState.fsm.transitions, ...transitions];
    newState.fsm.finals = [...newState.fsm.finals, false];

    newState.newState.name = "";
    newState.newState.states = [];
    // newState.newState.transitions = [];
    this.setState(newState);
    // this.props.fsmEdit(this.state.fsm);
  };

  addAlphabet = e => {
    if (e.key == "Enter") {
      let newState = { ...this.state };
      newState.fsm.alphabet = [
        ...newState.fsm.alphabet,
        newState.newAlphabet.name
      ];
      newState.newAlphabet.name = "";
      this.setState(newState);
    }
  };

  clearState = e => {
    let newState = { ...this.state };
    newState.fsm.states = [];
    newState.fsm.alphabet = [];
    newState.fsm.transitions = [];
    newState.fsm.initial = "";
    newState.fsm.finals = [];
    this.setState(newState);
  };

  render() {
    const { fsm, newState, newAlphabet } = this.state;
    return (
      <div>
        <Card style={{ height: "380px"}}>
          <CardBody>
            <CardTitle>
              <h1>Automato Finito</h1>
              {/* <h1>{fsm.isDeterministic()}</h1> */}
            </CardTitle>
            <CardText>
              <div style={{ height: "210px", overflow: "auto" }}>
                <table className="default-table table table-sm table-responsive-sm table-hover mb-1">
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
                      <th className="d-flex justify-content-center align-items-center">
                        <Input
                          className=" w-25 mr-2"
                          type="text"
                          value={newAlphabet.name}
                          onKeyPress={e => this.addAlphabet(e)}
                          onChange={e =>
                            this.setState({
                              ...this.state,
                              newAlphabet: {
                                ...newAlphabet,
                                name: e.target.value
                              }
                            })
                          }
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fsm.states.map((state, index) => (
                      <tr>
                        <td>
                          <Input
                            className="position-relative m-0"
                            type="radio"
                            name="initial"
                            checked={state === fsm.initial}
                            onChange={e => this.setInitialState(e, state)}
                          />
                        </td>
                        <td>
                          <Input
                            className="position-relative m-0"
                            type="checkbox"
                            checked={fsm.finals[index]}
                            onChange={e => this.setFinalState(e, index)}
                          />
                        </td>
                        <td>{state}</td>
                        {fsm.alphabet.map((letter, index) =>
                          this.getNextState(state, letter, fsm.transitions)
                        )}
                        <td />
                      </tr>
                    ))}

                    <tr>
                      <td> - </td>
                      <td> - </td>
                      <td>
                        <Input
                          type="text"
                          value={newState.name}
                          onChange={e =>
                            this.setState({
                              ...this.state,
                              newState: { ...newState, name: e.target.value }
                            })
                          }
                        />
                      </td>
                      {fsm.alphabet.map((letter, index) => (
                        <td>
                          <Input
                            type="text"
                            disabled={newState.name == ""}
                            value={
                              newState.states.length === 0
                                ? ""
                                : newState.states[index]
                            }
                            onChange={e => this.addTransition(e, index)}
                          />
                        </td>
                      ))}
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3">

              <Button
                color="primary"
                onClick={e => this.addTransitionsToAutomata(e)}
              >
                add
              </Button>
              <Button color="secondary" onClick={e => this.clearState()}>
                Limpar
              </Button>
              </div>
            </CardText>
            {/* <Button color="primary" onClick={e => this.props.fsmEdit(fsm)}>
              Salvar Automato
            </Button> */}
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
  { fsmEdit }
)(TransitionTable);
