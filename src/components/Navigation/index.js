import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import logo from '../../assets/iconWhite.png';

//TODO:
// https://stackoverflow.com/questions/32452695/react-bootstrap-how-to-collapse-menu-when-item-is-selected

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <NavigationAuth authUser={authUser} />
            ) : (
                    <NavigationNonAuth />
                )
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container className="w-75">
            <Navbar.Brand as={Link} to={ROUTES.LANDING}>
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                LawnHacks
                </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to={ROUTES.LANDING}>Landing</Nav.Link>
                    <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
                    <Nav.Link as={Link} to={ROUTES.ACCOUNT}>Account</Nav.Link>
                    {!!authUser.roles[ROLES.ADMIN] && (
                        <Nav.Link as={Link} to={ROUTES.ADMIN}>Admin</Nav.Link>
                    )}
                    <SignOutButton />
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

const NavigationNonAuth = () => (
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container className="w-75">
            <Navbar.Brand as={Link} to={ROUTES.LANDING}>LawnHacks</Navbar.Brand>
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