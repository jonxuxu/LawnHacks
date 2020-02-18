import React, { Component } from 'react';
import { Card, CardDeck, Row, Col, Button, ListGroup, ProgressBar } from 'react-bootstrap';
import DarkSkyApi from 'dark-sky-api';

import {
    AuthUserContext,
    withAuthorization,
    withAuthentication,
} from '../Session';
import { withFirebase } from '../Firebase';

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
                            <CurrentInfo weather={currentWeather} />
                        ) : (
                                <div>There are no weather forecasts...</div>
                            )}
                    </Col>
                    <Col className="h-100">
                        <Sensors />
                        <Row className="mt-4">
                            <Col lg={3}>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>Valve Control</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={9}>
                                <Card bg="light">
                                    <Card.Body>
                                        <Card.Title>Weather Projections</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </div>
        );
    }

}

const CurrentInfo = ({ weather }) => (
    <Card bg="light" className="h-100">
        <Card.Header>
            <Card.Title>Current Weather Conditions</Card.Title>
            <Card.Subtitle>{weather.summary}</Card.Subtitle>
        </Card.Header>
        <ListGroup variant="flush">
            <ListGroup.Item>
                Precipitation Intensity: {weather.precipIntensity} mm/h
                <ProgressBar striped variant="info" now={(weather.precipIntensity / 125.0) * 100} />
            </ListGroup.Item>
            <ListGroup.Item>
                Precipitation Probability: {weather.precipProbability} %
                <ProgressBar striped variant="info" now={weather.precipProbability * 100} />
            </ListGroup.Item>
            <ListGroup.Item>
                Pressure: {weather.pressure} mb
                <ProgressBar striped variant="info" now={weather.pressure - 970} />
            </ListGroup.Item>
            <ListGroup.Item>
                Cloud Cover: {weather.cloudCover} %
                <ProgressBar striped variant="info" now={weather.cloudCover} />
            </ListGroup.Item>
            <ListGroup.Item>
                UV Index: {weather.uvIndex}
                <ProgressBar striped variant="info" now={weather.uvIndex * 10} />
            </ListGroup.Item>
            <ListGroup.Item>
                Wind: {weather.windSpeed}km/h, Gusts at {weather.windGust} km/h
                <ProgressBar striped variant="info" now={(weather.windSpeed / 50.0) * 100} />
            </ListGroup.Item>
            <ListGroup.Item>
                Visibility: {weather.visibility} km
                <ProgressBar striped variant="info" now={weather.visibility} />
            </ListGroup.Item>
            <ListGroup.Item>
                Ozone: {weather.ozone} du
            </ListGroup.Item>
        </ListGroup>
    </Card>
);

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
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Subtitle className="mb-2 text-muted">Temperature</Card.Subtitle>
                        <Card.Title>{readings.temperature}</Card.Title>
                    </Col>
                    <Col md="auto">
                        <Button variant="danger" className={Style.btnCircle}><i class="fas fa-thermometer-half" /></Button>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated at {readings.timestamp}</small>
            </Card.Footer>
        </Card>
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Subtitle className="mb-2 text-muted">Humidity</Card.Subtitle>
                        <Card.Title>{readings.humidity}</Card.Title>
                    </Col>
                    <Col md="auto">
                        <Button variant="warning" className={Style.btnCircle}><i class="fab fa-cloudsmith" /></Button>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated at {readings.timestamp}</small>
            </Card.Footer>
        </Card>
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Subtitle className="mb-2 text-muted">Soil Moisture</Card.Subtitle>
                        <Card.Title>{readings.timestamp}</Card.Title>
                    </Col>
                    <Col md="auto">
                        <Button variant="success" className={Style.btnCircle}><i class="fas fa-tint" /></Button>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated at {readings.timestamp}</small>
            </Card.Footer>
        </Card>
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Subtitle className="mb-2 text-muted">Heat Index</Card.Subtitle>
                        <Card.Title>{readings.timestamp}</Card.Title>
                    </Col>
                    <Col md="auto">
                        <Button variant="info" className={Style.btnCircle}><i class="fas fa-tachometer-alt" /></Button>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated at {readings.timestamp}</small>
            </Card.Footer>
        </Card>
    </CardDeck>
);

const Sensors = withFirebase(SensorsBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);