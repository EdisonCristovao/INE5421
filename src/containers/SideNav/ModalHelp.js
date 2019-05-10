import React from 'react';
import { Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { MINI_DRAWER } from "constants/ActionTypes";

class Modalhelp extends React.Component {
    state = {
        openModalHelp: true
    }

    toggleModal = () => {
        this.setState({ openModalHelp: !this.state.openModalHelp });
    }

    render() {
        console.log(this.toggleModal);
        console.log(this.state.openModalHelp);
        return (
            <div className="d-flex justify-content-center">
                <div className="p-3 w-100">
                    <Button className="w-100" color="primary" onClick={this.toggleModal }><i class="zmdi zmdi-help"></i>
                        {' '}Help</Button>
                </div>

                <Modal
                    isOpen={this.state.openModalHelp}
                    toggle={this.toggleModal}
                >
                    <ModalHeader toggle={this.toggleModal}>Help FM-IO</ModalHeader>
                    <ModalBody>
                        <h2>Definindo um automato</h2>
                        <p>Defina o alfabeto em <strong>lowerCase</strong>, em seguida defina as transições estados em <strong>UperCase</strong>.<br/>
                        Transição nao deterministica deve se usar virgula ex: <strong>(A,B)</strong>.<br/>
                        Caso nao tenha transição pode deixar em branco. <br/>
                        Epsilon é representado por {`${'&'}`}. </p>

                        <h2>Definindo uma Gramatica</h2>
                        <p>As produções são geradas como o ex: <strong>S -> aS | a </strong> </p>

                        <h2>Reconhecimento de senteças</h2>
                        <p>Basta escrever a sentença e precionar 'ENTER', a cor mostra se foi reconhecido ou não. </p>

                        <h2>Espressão regular</h2>
                        <p><strong>Breve...</strong> </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>Voltar</Button>{" "}
                    </ModalFooter>
                </Modal>

            </div>
        );
    }
};

export default Modalhelp;
