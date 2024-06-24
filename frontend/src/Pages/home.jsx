import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { GrEdit, GrView, GrSearch } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Footer from "./footer";
import Header from "./header";
import News from "./news";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({
    name: "",
    genre: "",
    director: "",
    language: "",
    distribute: "",
    time: "",
    posterImg: "",
    storyline: "",
    releasedyear: "",
  });
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (movie) => {
    setSelectedMovie(movie);
    setShow(true);
  };
  const handleUpdateClose = () => {
    setUpdateShow(false);
  };

  const handleUpdateShow = (movie) => {
    setSelectedMovie(movie);
    setUpdateShow(true);
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await axios.get("http://localhost:8050/movie/movies");
        setMovies(response.data);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Error while fetching movies!",
          icon: "error",
        });
      }
    };
    loadMovies();
  }, []);

  function deletemovie(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8050/movie/movie/delete/${id}`)
          .then(() => {
            Swal.fire({
              title: "Deleted",
              text: "Selected movie has been deleted!",
              icon: "success",
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error",
              text: "Error while deleting movie!",
              icon: "error",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Selected movie is safe!",
          icon: "error",
        });
      }
    });
  }

  const {
    name,
    genre,
    director,
    language,
    distribute,
    time,
    posterImg,
    storyline,
    releasedyear,
  } = selectedMovie;

  const onInputChange = (e) => {
    setSelectedMovie({ ...selectedMovie, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:8050/movie/movie/update/${selectedMovie._id}`,
            selectedMovie
          )

          .then(() => {
            Swal.fire({
              title: "Saved & Updated",
              text: "Selected movie has been updated!",
              icon: "success",
              showCancelButton: true,
              cancelButtonText: "Done",
            });
            setUpdateShow(false);
            window.location.replace(window.location.href.split("#")[0]);
          })
          .catch((err) => {
            Swal.fire({
              title: "Try Again",
              text: "Something went wrong!",
              icon: "warning",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Selected movie is safe!",
          icon: "error",
        });
      }
    });
  };

  const [results, setResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput === "") {
      setResults(movies);
    } else {
      let results = movies.filter(
        (movie) =>
          movie.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchInput.toLowerCase()) ||
          movie.releasedyear
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          movie.language.toLowerCase().includes(searchInput.toLowerCase())
      );
      setResults(results);
    }
  }, [searchInput, movies]);

  return (
    <div className="App-movie">
      <Container>
        <Row md={12}>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Container fluid>
            <Col className="search-bar">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search movies by title, language, genre and released year"
                aria-label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <span className="input-group-text border-2" id="search-addon">
                <GrSearch /> 
                Search Movie
              </span>
            </Col>
          </Container>
        </Row>
        <br />
        <Row md={12}>
          {results.map((movie) => (
            <Col key={movie.id} md={3}>
              <Card className="item-feature-card">
                <Card.Img
                  variant="top"
                  src={movie.posterImg}
                  className="item-feature-image"
                />
                <Card.Body>
                  <Card.Title
                    className="text-center text-capitalize"
                    id="item-feature-title"
                  >
                    {movie.name}({movie.releasedyear})
                  </Card.Title>
                  <Card.Text className="text-start">
                    <span className="item-feature-key">Genre : </span>
                    <span className="text-capitalize" id="item-feature-value">
                      {movie.genre}
                    </span>
                  </Card.Text>
                  <Card.Text className="text-start">
                    <span className="item-feature-key">Language : </span>
                    <span className="text-capitalize" id="item-feature-value">
                      {movie.language}
                    </span>
                  </Card.Text>
                  <Card.Text className="text-start">
                    <span className="item-feature-key">Duration : </span>
                    <span className="text-capitalize" id="item-feature-value">
                      {movie.time} minutes
                    </span>
                  </Card.Text>

                  <div className="d-grid gap-2">
                    <Button variant="primary" onClick={() => handleShow(movie)}>
                      <GrView /> View
                    </Button>
                    <Button
                      variant="info"
                      onClick={() => handleUpdateShow(movie)}
                    >
                      <GrEdit /> Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deletemovie(movie._id)}
                    >
                      <MdDelete /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <News />
          </Col>
        </Row>
        <br />
        <hr className="section-divider" />
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>

      {/* View details modal */}
      {
        <Modal show={show} onHide={handleClose} className="view-detail-modal">
          <Modal.Header closeButton>
            <Modal.Title
              className="text-center text-capitalize"
              id="item-feature-title"
            >
              {selectedMovie.name}({selectedMovie.releasedyear})
            </Modal.Title>
            <br />
          </Modal.Header>
          <Image
            src={selectedMovie.posterImg}
            className="item-feature-poster"
          />
          <Modal.Body>
            <Form method="POST">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="item-feature-key">Genre |</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.genre}
                  className="text-capitalize"
                  id="item-feature-value"
                  readOnly={true}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label className="item-feature-key">Director |</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.director}
                  className="text-capitalize"
                  id="item-feature-value"
                  readOnly={true}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label className="item-feature-key">Language |</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.language}
                  className="text-capitalize"
                  id="item-feature-value"
                  readOnly={true}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label className="item-feature-key">
                  Distribution |
                </Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.distribute}
                  className="text-capitalize"
                  id="item-feature-value"
                  readOnly={true}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput5"
              >
                <Form.Label className="item-feature-key">
                  Duration (Minutes) |
                </Form.Label>
                <Form.Control
                  type="text"
                  value={selectedMovie.time}
                  className="text-capitalize"
                  id="item-feature-value"
                  readOnly={true}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="item-feature-key">
                  Story Line |
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={selectedMovie.storyline}
                  className="text-capitalize"
                  id="item-feature-value"
                  readOnly={true}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      }

      {/* update details modal */}
      {
        <Modal
          show={updateShow}
          onHide={handleUpdateClose}
          className="view-detail-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title
              className="text-center text-capitalize"
              id="item-feature-title"
            >
              {name}({releasedyear})
            </Modal.Title>
            <br />
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => onSubmit(e)} method="POST">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="item-feature-key">
                  Movie Title |
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => onInputChange(e)}
                  className="text-capitalize"
                  id="item-feature-value"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="item-feature-key">Genre |</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  value={genre}
                  onChange={(e) => onInputChange(e)}
                  className="text-capitalize"
                  id="item-feature-value"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label className="item-feature-key">Director |</Form.Label>
                <Form.Control
                  type="text"
                  name="director"
                  value={director}
                  onChange={(e) => onInputChange(e)}
                  className="text-capitalize"
                  id="item-feature-value"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label className="item-feature-key">Language |</Form.Label>
                <Form.Control
                  type="text"
                  name="language"
                  value={language}
                  onChange={(e) => onInputChange(e)}
                  className="text-capitalize"
                  id="item-feature-value"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label className="item-feature-key">
                  Distributed By |
                </Form.Label>
                <Form.Control
                  type="text"
                  name="distribute"
                  value={distribute}
                  onChange={(e) => onInputChange(e)}
                  className="text-capitalize"
                  id="item-feature-value"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput5"
              >
                <Form.Label className="item-feature-key">
                  Duration (Minutes) |
                </Form.Label>
                <Form.Control
                  type="text"
                  name="time"
                  value={time}
                  onChange={(e) => onInputChange(e)}
                  className="text-capitalize"
                  id="item-feature-value"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="item-feature-key">
                  Poster of the Movie |
                </Form.Label>
                <Form.Control
                  type="text"
                  name="posterImg"
                  value={posterImg}
                  onChange={(e) => onInputChange(e)}
                  className="text-capitalize"
                  id="item-feature-value"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="item-feature-key">
                  Story Line |
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="storyline"
                  rows={10}
                  value={storyline}
                  onChange={(e) => onInputChange(e)}
                  className="text-capitalize"
                  id="item-feature-value"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="item-feature-key">
                  Released Year |
                </Form.Label>
                <Form.Control
                  type="text"
                  name="releasedyear"
                  value={releasedyear}
                  onChange={(e) => onInputChange(e)}
                  className="text-capitalize"
                  id="item-feature-value"
                  autoFocus
                />
              </Form.Group>
              <Modal.Footer>

              <Button variant="info" type="submit">
                Update and Save
              </Button>
              <Button variant="secondary" onClick={handleUpdateClose}>
              Close
            </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>

        </Modal>
      }
    </div>
  );
}
