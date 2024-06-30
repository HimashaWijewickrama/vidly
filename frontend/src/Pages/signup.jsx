import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";

export default function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [adminlevel, setAdminlevel] = useState("");
  const [email, setEmail] = useState("");
  const [pnumber, setPnumber] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newUser = {
      fname,
      lname,
      adminlevel,
      email,
      pnumber,
      age,
      password,
    };
    axios
      .post("http://localhost:8050/user/user/add", newUser)
      .then(() => {
        alert("User item was added successfully!");
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <div className="App-user">
      <Container className="form-container">
        <span className="title-text fw-bold">Sign Up to Vidley</span>
        <br />
        <Form style={{ margin: "30px" }} onSubmit={sendData}>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3 "
                controlId="exampleForm.ControlInput1"
                as={Row}
              >
                <Form.Label className="fs-6 text-start fw-bold">
                  First Name *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  size="sm"
                  name="fname"
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
                as={Row}
              >
                <Form.Label className="fs-6 text-start fw-bold">
                  Last Name *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  size="sm"
                  name="lname"
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
                as={Row}
              >
                <Form.Label className="fs-6 text-start fw-bold">
                  User Type *
                </Form.Label>
                <Form.Select
                  size="sm"
                  name="adminlevel"
                  onChange={(e) => {
                    setAdminlevel(e.target.value);
                  }}
                >
                  <option>Select option</option>
                  <option>Buyer</option>
                  <option>Seller</option>
                  <option>Administrater</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput4"
                as={Row}
              >
                <Form.Label className="fs-6 text-start fw-bold">
                  Email Address *
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  size="sm"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput5"
                as={Row}
              >
                <Form.Label className="fs-6 text-start fw-bold">
                  Phone Number *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  size="sm"
                  name="pnumber"
                  onChange={(e) => {
                    setPnumber(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput6"
                as={Row}
              >
                <Form.Label className="fs-6 text-start fw-bold">
                  Age *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your age "
                  size="sm"
                  name="age"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput7"
                as={Row}
              >
                <Form.Label className="fs-6 text-start fw-bold">
                  Password *
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your password "
                  size="sm"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="I agree with Vidley's Terms of Service and Privacy Policy."
                className="fs-6 text-start"
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Create Account
            </Button>
          </Row>
        </Form>
        <span className="sub-text">
          Already have an account? <a href="/vidly/sign-up">Sign In</a>{" "}
        </span>
      </Container>
    </div>
  );
}
