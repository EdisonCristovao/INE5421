import React, { Component } from 'react'
import { CardText, Card, CardBody, CardTitle, Input, Tooltip } from 'reactstrap';

export default class TransitionTable extends Component {
    // state = {
    //     fsm: [
    //         {}
    //     ]
    // }
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
                                        <th><i class="zmdi zmdi-arrow-right"></i></th>
                                        <th>F</th>
                                        <th>
                                                <Input className="col-1">
                                                </Input>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>S</td>
                                        <td>N</td>
                                        <td>S1</td>
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
