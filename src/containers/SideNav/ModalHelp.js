import React from "react";
import {
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { MINI_DRAWER } from "constants/ActionTypes";

class Modalhelp extends React.Component {
  state = {
    openModalHelp: false
  };

  toggleModal = () => {
    this.setState({ openModalHelp: !this.state.openModalHelp });
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="p-3 w-100">
          <Button className="w-100" color="primary" onClick={this.toggleModal}>
            <i class="zmdi zmdi-help" /> Help
          </Button>
        </div>

        <Modal isOpen={this.state.openModalHelp} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Help FM-IO</ModalHeader>
          <ModalBody>
            <h2>
              <strong>Definindo um automato</strong>
            </h2>
            <p>
              Na primeira linha adicionam-se letras ao <strong>alfabeto</strong>{" "}
              do automato.
              <br />
              Nas linhas seguintes adicionam-se os <strong> estados</strong> (1º
              coluna) e suas <strong>transições</strong> (demais colunas).
              <br />
              Para adicionar uma nova letra ao alfabeto, basta clicar{" "}
              <strong>'ENTER'</strong> na ultima coluna da primeira linha.
              <br />
              Para adicionar um novo estado, basta clicar no botão{" "}
              <strong>"Add"</strong>.<br />
              Para limpar o automato, basta clicar no botão{" "}
              <strong>"limpar"</strong>.<br />
              Transição nao deterministica deve-se usar virgula, ex:{" "}
              <strong>A,B</strong>.<br />
              Transição para estado morto são representadas por transições em
              branco. <br />
              Epsilon é representado por "<strong>{`${"&"}`}"</strong>.{" "}
            </p>

            <h2>
              <strong>Definindo uma Gramatica</strong>
            </h2>
            <p>
              As produções são do tipo: "<strong>S -> a S' b | b A | b A' | S </strong>" (espaço entre cada simbolo de uma produção).
              <br />
              Espaços necessarios p/ aceitar simbolos com mais de um caracter.
              <br />
              Epsilon representado por : <strong>{`&`}</strong> <br />A{" "}
              <strong>primeira</strong> produção adicionada contem o simbolo
              inicial da gramatica.
              <br />
            </p>

            <h2>
              <strong>Reconhecimento de senteças</strong>
            </h2>
            <p>
              Basta escrever a sentença e precionar <strong>'ENTER'</strong>.{" "}
              <br />
              Caso cor = verde, reconheceu. Caso cor = vermelho, não reconheceu.
            </p>

            <h2>
              <strong>Determinizador</strong>
            </h2>
            <p>
              O determinizador fica no canto superior direito em `operacoes`.{" "}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>
              Voltar
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Modalhelp;
