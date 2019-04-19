import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

import { CardText, Card, CardBody, CardTitle, Input, Alert, Button } from 'reactstrap';

class SamplePage extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.samplePage"/>}/>
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.samplePage.description"/></h1>
                </div> */}


                <div className="row">
                    <div className="col-8">
                        <Card>
                            <CardBody>
                                <CardTitle><h1>Altomato Finito</h1></CardTitle>
                                <CardText>
                                    <table className="default-table table table-sm table-responsive-sm table-hover">
                                        <thead className="th-border-b">
                                            <tr>
                                                <th>Inicial</th>
                                                <th>Finais</th>
                                                <th>Estado</th>
                                                <th>Transição</th>
                                                <th>Destino</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>S</td>
                                                <td>N</td>
                                                <td>S1</td>
                                                <td>a</td>
                                                <td>S2</td>
                                            </tr>
                                            <tr>
                                                <td>S</td>
                                                <td>N</td>
                                                <td>S1</td>
                                                <td>a</td>
                                                <td>S2</td>
                                            </tr>
                                            <tr>
                                                <td>S</td>
                                                <td>N</td>
                                                <td>S1</td>
                                                <td>a</td>
                                                <td>S2</td>
                                            </tr>
                                            <tr>
                                                <td>S</td>
                                                <td>N</td>
                                                <td>S1</td>
                                                <td>a</td>
                                                <td>S2</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-4">
                        <Card>
                            <CardBody>
                                <CardTitle><h1>Reconhecimento de Sentenças</h1></CardTitle>
                                <CardText>

                                    <Alert color="success" isOpen={true} toggle={() => console.log()}>
                                        aaaabbbaab
                                    </Alert> <Alert color="danger" isOpen={true} toggle={() => console.log()}>
                                        aaaabbbaab
                                    </Alert>

                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    {/* <div className="col">
                        <Card>
                            <CardBody>
                                <h1>Edison</h1>
                            </CardBody>
                        </Card>
                    </div> */}
                </div>

                <div className="row">
                    <div className="col">
                        <Card>
                            <CardBody>
                                <CardTitle><h1>Expressão Regular</h1></CardTitle>
                                <CardText>
                                    <Input type="text" name="er" placeholder="Defina uma ER" />
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <CardBody>
                                <CardTitle><h1>Gramatica Regular</h1></CardTitle>
                                <CardText>
                                    <Input type="textarea" row="5" name="gr" placeholder="Defina uma ER" />
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>
                    {/* <div className="col">
                        <Card>
                            <CardBody>
                                <h1>Edison</h1>
                            </CardBody>
                        </Card>
                    </div> */}
                </div>
            </div>
        );
    }
}


export default SamplePage;