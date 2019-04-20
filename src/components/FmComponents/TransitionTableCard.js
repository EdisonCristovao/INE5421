import React, { Component } from 'react'
import { CardText, Card, CardBody, CardTitle, Input, Alert, Button } from 'reactstrap';

export default class TransitionTable extends Component {
    render() {
        return (
            <div>
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
        )
    }
}
