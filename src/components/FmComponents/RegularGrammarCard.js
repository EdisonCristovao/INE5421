import React, { Component } from 'react'
import { CardText, Card, CardBody, CardTitle, Input, Alert, Button } from 'reactstrap';

export default class RegularGrammarCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle><h1>Gramatica Regular</h1></CardTitle>
                        <CardText>
                            <Input type="textarea" row="5" name="gr" placeholder="Defina uma ER" />
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
