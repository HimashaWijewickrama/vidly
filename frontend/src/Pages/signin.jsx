import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function Signin() {
  const matchEmail = (e) => {
    console.log(e.target.value);
    if (e.target.value === "hello123@gmail.com") {
      console.log("Correct user");
    } else {
      console.log("Incorrect user");
    }
  };

  const matchPassword = (e) => {
    if (e.target.value === "hello123@gmail.com") {
      console.log("Correct user");
    } else {
      console.log("Incorrect user");
    }
  };

  return (
    <div className="App-user">
      <Container className="form-container">
        <span className="title-text fw-bold">Sign In to Vidley</span>
        <br />
        <Form style={{ margin: "30px" }}>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
                as={Row}
                name="password"
                onChange={matchPassword}
              >
                <Form.Label className="fs-6 text-start fw-bold">
                  Password *
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  size="sm"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
                as={Row}
                name="email"
                onChange={matchEmail}
              >
                <Form.Label className="fs-6 text-start fw-bold">
                  Email Address *
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  size="sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Button variant="success" type="submit">
              Log In
            </Button>
          </Row>
        </Form>
        <span className="sub-text">
          Don't have an account? <a href="/sign-up">Sign Up</a>{" "}
        </span>
      </Container>
    </div>
  );
}
