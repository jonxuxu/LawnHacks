import React from 'react';
import { Container } from 'react-bootstrap';

import { withAuthorization } from '../Session';

const HomePage = () => (
    <Container>
        <h1>Home</h1>
    </Container>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);