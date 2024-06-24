import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Nav from "./nav";

export default function Header() {
  return (
    <Container>
      <Row>
        <Col>
          <div className="cover-poster-item">
            <img
              src="https://sm.ign.com/t/ign_in/screenshot/default/marv_eawn.1200.png"
              className="d-block w-10’0"
              alt="vidly-cover-1"
            />
          </div>
        </Col>
      </Row>
      <Row className="title-section">
        <Col className="title-text">Vidly</Col>
      </Row>
      <Row>
        <Nav/>
      </Row>
    </Container>
  );
}
