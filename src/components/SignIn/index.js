import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Container, Form, Button, Card } from 'react-bootstrap';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <Container>
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title>Sign In</Card.Title>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
      </Card.Body>
    </Card>
  </Container>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SingInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group>
          <Form.Control
            name="email"
            value={email}
            onChange={this.onChange}
            type="email"
            placeholder="Email Address"
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button disabled={isInvalid} type="submit">
          Sign In
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SingInFormBase);

export default SignInPage;

export { SignInForm };