import React from 'react';
import ContainerHeader from 'components/ContainerHeader/index';
import IntlMessages from 'util/IntlMessages';

import Cards from './../../../components/Cards/Cafe';
import { Button, Card, CardBody, CardImg } from 'reactstrap';

class SamplePage extends React.Component {

    render() {
        return (
            <div className="app-wrapper">
                {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.samplePage"/>}/>
                <div className="d-flex justify-content-center">
                    <h1><IntlMessages id="pages.samplePage.description"/></h1>
                </div> */}
                <div className="row">
                    <div className="col">
                        <Card>
                            <h1>Edison</h1>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <h1>Edison</h1>
                        </Card>
                    </div>
                    <div className="col">
                        <Card>
                            <h1>Edison</h1>
                        </Card>
                    </div>
                </div>

            </div>
        );
    }
}

export default SamplePage;