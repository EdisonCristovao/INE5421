import React, { Component } from 'react'
import { CardText, Card, CardBody, CardTitle, Input, Alert, Button } from 'reactstrap';

export default class RecognizeSentenceCard extends Component {
    render() {
        return (
            <div>
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
        )
    }
}
