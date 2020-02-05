import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import { Container, Button } from 'react-bootstrap';

import Style from '../../styles/Landing.module.css'

const Landing = () => (
    <div className={Style.landingBackground}>
        <Container>
            <div className={Style.introText}>
                <h1>Goodbye yellow lawns!</h1>
                <h5>Turn your everyday sprinkler into a smart, automatic lawn watering system.</h5>
                <Button as={Link} to={ROUTES.SIGN_IN}>Get Started</Button>
            </div>
        </Container>
    </div>
)

export default Landing;