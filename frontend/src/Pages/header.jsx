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
              src="https://w.wallhaven.cc/full/0w/wallhaven-0w2de6.jpg"
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
