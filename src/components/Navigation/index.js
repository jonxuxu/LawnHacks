import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser }) => (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container className="w-75">
            <Navbar.Brand>LawnHacks</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </Container>
    </Navbar>
);

const NavigationAuth = () => (
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            <Nav.Link><Link to={ROUTES.LANDING}>Landing</Link></Nav.Link>
            <Nav.Link><Link to={ROUTES.HOME}>Home</Link></Nav.Link>
            <Nav.Link><Link to={ROUTES.ACCOUNT}>Account</Link></Nav.Link>
            <SignOutButton />
        </Nav>
    </Navbar.Collapse>
);

const NavigationNonAuth = () => (
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            <Nav.Link><Link to={ROUTES.LANDING}>Landing</Link></Nav.Link>
            <Nav.Link><Link to={ROUTES.SIGN_IN}>Sign In</Link></Nav.Link>
        </Nav>
    </Navbar.Collapse>
);
export default Navigation;