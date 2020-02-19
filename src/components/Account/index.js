import React from 'react'
import { Row, Card, ListGroup } from 'react-bootstrap';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <Row className="justify-content-center align-items-center h-100">
                <Card style={{ width: '25rem' }}>
                    <Card.Body>
                        <Card.Title>Account: {authUser.email}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item><PasswordForgetForm /></ListGroup.Item>
                            <ListGroup.Item><PasswordChangeForm /></ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Row>

        )}
    </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);