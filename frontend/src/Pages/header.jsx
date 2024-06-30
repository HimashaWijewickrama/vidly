import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "./nav";

export default function Header() {
  return (
    <div>
      <Row >
      <Container>
        <a className="navbar-brand" href="/vidly/home" id="title-text">
          vidly
          <h6>The movie rendering service</h6>
          <hr/>
        </a>
        </Container>
      </Row>
      <Row>
        <Col>
          <div className="cover-poster-item">
            <img
              src="https://images.unsplash.com/photo-1655057011043-158c48f3809d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="vidly-cover-poster"
            />
            <div className="cover-poster-text">
              Let's <br />
              <span></span>
            </div>
          </div>
        </Col>
      </Row>
      {/* <Row className="title-section">
        <Col className="title-text">Vidly</Col>
      </Row> */}
      <Row>
        <Nav />
      </Row>
    </div>
  );
}
