import React, { Component } from 'react'
import {connect} from 'react-redux';
import { CardText, Card, CardBody, CardTitle, Input, Alert, Button } from 'reactstrap';
import { changeRegGramma } from "../../actions/Language"

class RegularGrammarCard extends Component {
    render() {
        const { changeRegGramma } = this.props
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle><h1>Gramatica Regular</h1></CardTitle>
                        <CardText>
                            <Input type="textarea" row="5" name="gr" placeholder="Defina uma ER" onChange={(e)=> changeRegGramma(e.target.value)} />
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default connect(null, {changeRegGramma})(RegularGrammarCard);