import React from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class modalAutoDeterministifc extends React.Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  
  render() {
    const { fsm } = this.props;
    
    return (
      <div>
        <li className="pointer" onClick={this.toggle}>
          <div className="d-flex align-items-center">
            {/* <i className={`flag flag-24 flag-${icon}`} /> */}
            <h4 className="mb-0 ml-2">Determinizar</h4>
          </div>
        </li>

        {fsm !== undefined &&
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
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
                        // onChange={e => this.setInitialState(e, state)}
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Do Something</Button>{" "}
            <Button color="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
        }
      </div>
    );
  }
}
const mapState = ({ languages }) => {
  const { listLanguages, selectedLanguage } = languages;
  return { language: listLanguages[selectedLanguage] };
};

export default connect(mapState)(modalAutoDeterministifc);
