import React, { Component } from 'react'
import { connect } from  'react-redux';

import { CardText, Card, CardBody, CardTitle, Input, Alert, Button } from 'reactstrap';
import { changeRegExpression } from "../../actions/Language"

class RegularExpression extends Component {
    render() {
        const { changeRegExpression } = this.props;
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle><h1>Expressão Regular</h1></CardTitle>
                        <CardText>
                            <Input type="text" name="er" placeholder="Defina uma ER" onChange={(e)=> changeRegExpression(e.target.value)} />
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

const mapState = ({ languages }) => {
    console.log(languages, '<----')
    const { listLanguages, selectedLanguage } = languages;
    return { listLanguages, selectedLanguage };
}

export default connect(mapState, {changeRegExpression})(RegularExpression)