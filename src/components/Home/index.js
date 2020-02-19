import React, { Component } from 'react';
import { Card, CardDeck, Row, Col, Button } from 'react-bootstrap';
import DarkSkyApi from 'dark-sky-api';

import {
    AuthUserContext,
    withAuthorization,
    withAuthentication,
} from '../Session';
import { withFirebase } from '../Firebase';

import CurrentWeather from './currentWeather';
import Forecast from './forecast';

import Style from '../../styles/Home.module.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            currentWeather: {},
            position: {
                latitude: 43.075284,
                longitude: -89.384318
            }
        }
    }


    componentDidMount() {
        DarkSkyApi.apiKey = 'e45ca03362b936d778dbd854dfa652c6';
        DarkSkyApi.units = 'si';

        this.setState({ loading: true });
        DarkSkyApi.loadCurrent(this.state.position)
            .then(result => {
                this.setState({
                    currentWeather: result,
                    loading: false
                });
            })
            .catch(err => {
                this.setState({
                    currentWeather: null,
                    loading: false
                });
            });
    }

    render() {
        const { loading, currentWeather } = this.state;

        return (
            <div className="p-5 h-100 d-flex flex-column">
                <h1>Your Dashboard</h1>
                {/*https://demos.creative-tim.com/material-dashboard-react/#/admin/dashboard */}
                <Row className="flex-grow-1 mt-4">
                    <Col lg={3} className="h-100 mb-4">
                        {loading && <div>Loading ...</div>}
                        {currentWeather ? (
                            <CurrentWeather weather={currentWeather} />
                        ) : (
                                <div>There are no weather forecasts...</div>
                            )}
                    </Col>
                    <Col className="h-100">
                        <Sensors />
                    </Col>
                </Row>
            </div>
        );
    }

}

class SensorsBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            readings: {},
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        console.log(this.props.authUser);
        this.props.firebase.device("BTdKUqTj03XFgji3yOiKoQMokPG2").on('value', snapshot => {
            const sensorObject = snapshot.val();
            if (sensorObject) {
                // Connvert sensors object from snapshot
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
        this.props.firebase.device(this.props.authUser).off();
    }

    toggleValve = e => {
        e.preventDefault();
        const newValve = this.state.readings.valve == 1 ? 0 : 1;
        this.props.firebase.device("BTdKUqTj03XFgji3yOiKoQMokPG2").set({
            ...this.state.readings,
            valve: newValve
        });
    }

    render() {
        const { readings, loading } = this.state;

        return (

            <div className="h-100">
                {loading && <div>Loading ...</div>}
                {readings ? (
                    <div className="h-100 d-flex flex-column">
                        <ReadingCard readings={readings} />
                        <Row className="mt-4 flex-grow-1">
                            <Col lg={9}>
                                <Card bg="light" className="h-100">
                                    <Card.Header>
                                        <Card.Title>Weather Projections</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Forecast />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={3}>
                                <Card bg="light" className="text-center">
                                    <Card.Header>
                                        <Card.Title>Valve Control</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Button variant={readings.valve == 1 ? "success" : "danger"} size="lg" onClick={this.toggleValve}>
                                            {readings.valve == 1 ? "On" : "Off"}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                ) : (
                        <div>There are no readings ...</div>
                    )}
            </div>
        )
    }
}


const ReadingCard = ({ readings }) => {
    let date = new Date(readings.timestamp * 1000);
    let dateTime = date.toLocaleTimeString();
    return (
        <CardDeck>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Subtitle className="mb-2 text-muted">Temperature</Card.Subtitle>
                            <Card.Title>{readings.temperature && readings.temperature.toFixed(2)}°C</Card.Title>
                        </Col>
                        <Col md="auto">
                            <Button variant="danger" className={Style.btnCircle}><i class="fas fa-thermometer-half" /></Button>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated at {dateTime}</small>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Subtitle className="mb-2 text-muted">Humidity</Card.Subtitle>
                            <Card.Title>{readings.humidity && readings.humidity.toFixed(2)}%</Card.Title>
                        </Col>
                        <Col md="auto">
                            <Button variant="warning" className={Style.btnCircle}><i class="fab fa-cloudsmith" /></Button>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated at {dateTime}</small>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Subtitle className="mb-2 text-muted">Soil Moisture</Card.Subtitle>
                            <Card.Title>{readings.soil && readings.soil.toFixed(2)}%</Card.Title>
                        </Col>
                        <Col md="auto">
                            <Button variant="success" className={Style.btnCircle}><i class="fas fa-tint" /></Button>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated at {dateTime}</small>
                </Card.Footer>
            </Card>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Subtitle className="mb-2 text-muted">Heat Index</Card.Subtitle>
                            <Card.Title>{readings.heatIndex && readings.heatIndex.toFixed(2)}°C</Card.Title>
                        </Col>
                        <Col md="auto">
                            <Button variant="info" className={Style.btnCircle}><i class="fas fa-tachometer-alt" /></Button>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated at {dateTime}</small>
                </Card.Footer>
            </Card>
        </CardDeck>
    );
}

const Sensors = withFirebase(SensorsBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);