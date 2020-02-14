import React, { Component } from 'react';
import { Card, CardDeck, Row, Col } from 'react-bootstrap';

import {
    AuthUserContext,
    withAuthorization,
    withAuthentication,
} from '../Session';
import { withFirebase } from '../Firebase';

import Style from '../../styles/Home.module.css';

const HomePage = () => (
    <div className="p-5 h-100 d-flex flex-column">
        <h1>Your Dashboard</h1>
        {/*https://demos.creative-tim.com/material-dashboard-react/#/admin/dashboard */}
        <Row className="flex-grow-1 mt-4">
            <Col lg={3} className="h-100 mb-4">
                <Card bg="light" className="h-100">
                    <Card.Body>
                        <Card.Title>Hi there</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="h-100">
                <Sensors />
                <Card bg="light" className="mt-4">
                    <Card.Body>
                        <Card.Title>Weather Projections</Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
);

class SensorsBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            readings: {}
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        console.log(this.props.authUser);
        //this.props.firebase.sensors("BTdKUqTj03XFgji3yOiKoQMokPG2").on('value', snapshot => {
        this.props.firebase.sensors("BTdKUqTj03XFgji3yOiKoQMokPG2").on('value', snapshot => {
            const sensorObject = snapshot.val();

            if (sensorObject) {
                // Connvert sensors object form snapshot
                this.setState({
                    readings: sensorObject,
                    loading: false,
                });
            } else {
                this.setState({ readings: null, loading: false })
            }

        });
    }

    componentWillUnmount() {
        this.props.firebase.sensors(this.props.authUser).off();
    }

    render() {
        const { readings, loading } = this.state;

        return (

            <div>
                {loading && <div>Loading ...</div>}
                {readings ? (
                    <ReadingCard readings={readings} />
                ) : (
                        <div>There are no readings ...</div>
                    )}
            </div>
        )
    }

}

const ReadingCard = ({ readings }) => (
    <CardDeck>
        <Card bg="success" text="white">
            <Card.Body>
                <Card.Title>{readings.temperature}</Card.Title>
                <Card.Subtitle className="mb-2">Temperatrue</Card.Subtitle>
            </Card.Body>
            <Card.Footer>
                <small className={Style.mutedText}>Last updated at {readings.timestamp}</small>
            </Card.Footer>
        </Card>
        <Card bg="info" text="white">
            <Card.Body>
                <Card.Title>{readings.humidity}</Card.Title>
                <Card.Subtitle className="mb-2">Humidity</Card.Subtitle>
            </Card.Body>
            <Card.Footer>
                <small className={Style.mutedText}>Last updated at {readings.timestamp}</small>
            </Card.Footer>
        </Card>
        <Card bg="warning" text="white">
            <Card.Body>
                <Card.Title>{readings.timestamp}</Card.Title>
                <Card.Subtitle className="mb-2">Soil Moisture</Card.Subtitle>
            </Card.Body>
            <Card.Footer>
                <small className={Style.mutedText}>Last updated at {readings.timestamp}</small>
            </Card.Footer>
        </Card>
        <Card bg="danger" text="white">
            <Card.Body>
                <Card.Title>{readings.timestamp}</Card.Title>
                <Card.Subtitle className="mb-2">Heat Index</Card.Subtitle>
            </Card.Body>
            <Card.Footer>
                <small className={Style.mutedText}>Last updated at {readings.timestamp}</small>
            </Card.Footer>
        </Card>
    </CardDeck>
);

const Sensors = withFirebase(SensorsBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);