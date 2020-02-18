import React from 'react';
import { Card, ListGroup, ProgressBar, Tooltip, OverlayTrigger } from 'react-bootstrap';

function CurrentWeather(props) {
    const weather = props.weather;
    const listings = [
        {
            title: `Precipitation Intensity: ${weather.precipIntensity}mm/h`,
            progress: (weather.precipIntensity / 125.0) * 100,
            popover: "The intensity (in inches of liquid water per hour) of precipitation occurring at the given time."
        },
        {
            title: `Precipitation Probability: ${weather.precipProbability} %`,
            progress: weather.precipProbability * 100,
            popover: "The probability of precipitation occurring, between 0% and 100%, inclusive."
        }, {
            title: `Pressure: ${weather.pressure} mb`,
            progress: weather.pressure - 970,
            popover: "The sea-level air pressure in millibars, displayed between 960 to 1070 mb."
        }, {
            title: `Cloud Cover: ${weather.cloudCover} %`,
            progress: weather.cloudCover,
            popover: "The percentage of sky occluded by clouds, between 0% and 100%, inclusive."
        }, {
            title: `UV Index: ${weather.uvIndex}`,
            progress: weather.uvIndex * 10,
            popover: "The UV index, displayed between 0 and 10 inclusive."
        }, {
            title: `Wind: ${weather.windSpeed}km/h, Gusts at ${weather.windGust} km/h`,
            progress: (weather.windSpeed / 50.0) * 100,
            popover: "The wind speed in kilometers per hour, as a percentage out of 50 km/h."
        }, {
            title: `Visibility: ${weather.visibility} km`,
            progress: weather.visibility * 0.62 * 10,
            popover: "The average visibility in miles, capped at 10 miles."
        }, {
            title: `Ozone: ${weather.ozone} du`,
            progress: null,
            popover: "The columnar density of total atmospheric ozone at the given time in Dobson units."
        },
    ];

    return (
        <Card bg="light" className="h-100">
            <Card.Header>
                <Card.Title>Current Weather Conditions</Card.Title>
                <Card.Subtitle>{weather.summary}</Card.Subtitle>
            </Card.Header>
            <ListGroup variant="flush">
                {listings.map(value => (
                    <OverlayTrigger
                        key={value}
                        placement="right"
                        overlay={
                            <Tooltip id={`tooltip-right`}>
                                {value.popover}
                            </Tooltip>
                        }
                    >
                        <ListGroup.Item>
                            {value.title}
                            {value.progress != null && <ProgressBar striped variant="info" now={value.progress} />}
                        </ListGroup.Item>
                    </OverlayTrigger>
                ))}
            </ListGroup>
        </Card>
    );
}

export default CurrentWeather;