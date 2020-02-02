import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

//TODO:
// https://stackoverflow.com/questions/32452695/react-bootstrap-how-to-collapse-menu-when-item-is-selected

const Navigation = ({ authUser }) => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>

);

const NavigationAuth = () => (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container className="w-75">
            <Navbar.Brand>LawnHacks</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to={ROUTES.LANDING}>Landing</Nav.Link>
                    <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
                    <Nav.Link as={Link} to={ROUTES.ACCOUNT}>Account</Nav.Link>
                    <SignOutButton />
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

const NavigationNonAuth = () => (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container className="w-75">
            <Navbar.Brand>LawnHacks</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to={ROUTES.LANDING}>Landing</Nav.Link>
                    <Nav.Link as={Link} to={ROUTES.SIGN_IN}>Sign In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
export default Navigation;