import React, { Component } from 'react'
import { CardText, Card, CardBody, CardTitle, Input, Alert, Button } from 'reactstrap';

export default class RegularExpression extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle><h1>Expressão Regular</h1></CardTitle>
                        <CardText>
                            <Input type="text" name="er" placeholder="Defina uma ER" />
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
