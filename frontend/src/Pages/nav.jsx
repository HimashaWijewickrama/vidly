import axios from "axios";
import * as formik from 'formik';
import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import Swal from "sweetalert2";
import * as yup from 'yup';

export default function Nav() {

  const { Formik } = formik;

  const validationschema = yup.object().shape({
    name: yup.string().required(),
    genre: yup.string().required(),
    releasedyear: yup.string().required(),
    posterImg: yup.string().required(),
    distribute: yup.string().required(),
    time: yup.string().required(),
  });


  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [language, setLanguage] = useState("");
  const [distribute, setDistribute] = useState("");
  const [time, setTime] = useState("");
  const [posterImg, setPosterImg] = useState("");
  const [storyline, setStoryline] = useState("");
  const [releasedyear, setReleasedyear] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };


  function sendData(e) {
    e.preventDefault();

    const newMovie = {
      name,
      genre,
      director,
      language,
      distribute,
      time,
      posterImg,
      storyline,
      releasedyear,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://localhost:8050/movie/movie/add`, newMovie)
          .then(() => {
            Swal.fire({
              title: "Saved",
              text: "Selected movie has been saved!",
              icon: "success",
            });
            setTimeout(function () {
              window.location.reload();
            }, 2500);
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
          text: "Selected movie is not saved!",
          icon: "error",
        });
      }
    });

  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Container fluid id="title-section">
        <a className="navbar-brand" href="/vidly/home" id="title-text">
          vidly
        </a>
        <h1 className="mb-3 fw-bold">| </h1>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <span className="navbar-nav me-auto mb-8 mb-lg-0">
            <Button variant="dark" onClick={() => handleModalShow()}>
              <GrAdd /> Add New
            </Button>
          </span>
        </div>
        {/* Add details modal */}
        <Modal
          show={showModal}
          onHide={handleModalClose}
          className="view-detail-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title
              className="text-center text-capitalize"
              id="item-feature-title"
            >
              Enter movie details
            </Modal.Title>
            <br />
          </Modal.Header>
          <Modal.Body>
          <Formik
      validationSchema={validationschema}
      onSubmit={sendData}
      // initialValues={{
      //   name: "",
      //   releasedyear: "",
      //   genre: "",
      //   director: "",
      //   language: "",
      //   distribute: "",
      //   time: "",
      //   storyline: "",
      //   posterImg: "",
      // }}
    >
 {({ sendData, touched, errors }) => (
            <Form
              // onSubmit={sendData}
              method="POST"
              noValidate
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="item-feature-key">
                  Movie Title * |
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  className="text-capitalize"
                  placeholder="Enter title of the movie"
                  id="item-feature-value"
                  // value={values.name}
                  isValid={touched.name && !errors.name}  
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  autoFocus
                  required={true}
                />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>

              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="item-feature-key">
                  Released Year * |
                </Form.Label>
                <Form.Control
                  type="text"
                  name="releasedyear"
                  className="text-capitalize"
                  id="item-feature-value"
                  // value={values.releasedyear}
                  isValid={touched.releasedyear && !errors.releasedyear}  
                  placeholder="Enter released year of the movie"
                  onChange={(e) => {
                    setReleasedyear(e.target.value);
                  }}
                  autoFocus
                  required={true}
                />
              <Form.Control.Feedback type="invalid">
                {errors.releasedyear}
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="item-feature-key">Genre * |</Form.Label>
                <Form.Control
                  type="text"
                  name="genre"
                  className="text-capitalize"
                  id="item-feature-value"
                  placeholder="Enter genre"
                  // value={values.genre}
                  isValid={touched.genre && !errors.genre}  
                  onChange={(e) => {
                    setGenre(e.target.value);
                  }}
                  autoFocus
                  required={true}
                />
              <Form.Control.Feedback type="invalid">
                {errors.genre}
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label className="item-feature-key">
                  Director * |
                </Form.Label>
                <Form.Control
                  type="text"
                  name="director"
                  className="text-capitalize"
                  id="item-feature-value"
                  // value={values.director}
                  isValid={touched.director && !errors.director}  
                  placeholder="enter name of the director"
                  onChange={(e) => {
                    setDirector(e.target.value);
                  }}
                  autoFocus
                  required={true}
                />
              <Form.Control.Feedback type="invalid">
                {errors.director}
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label className="item-feature-key">
                  Language * |
                </Form.Label>
                <Form.Control
                  type="text"
                  name="language"
                  className="text-capitalize"
                  id="item-feature-value"
                  // value={values.language}
                  isValid={touched.language && !errors.language}  
                  placeholder="enter language of the movie"
                  onChange={(e) => {
                    setLanguage(e.target.value);
                  }}
                  autoFocus
                  required
                />
              <Form.Control.Feedback type="invalid">
                {errors.language}
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label className="item-feature-key">
                  Distributed By * |
                </Form.Label>
                <Form.Control
                  type="text"
                  name="distribute"
                  className="text-capitalize"
                  id="item-feature-value"
                  // value={values.distribute}
                  isValid={touched.distribute && !errors.distribute}  
                  placeholder="enter name of the distributed company"
                  onChange={(e) => {
                    setDistribute(e.target.value);
                  }}
                  autoFocus
                  required
                />
                    <Form.Control.Feedback type="invalid">
                {errors.distribute}
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput5"
              >
                <Form.Label className="item-feature-key">
                  Duration (Minutes) * |
                </Form.Label>
                <Form.Control
                  type="number"
                  name="time"
                  className="text-capitalize"
                  id="item-feature-value"
                  // value={values.time}
                  isValid={touched.time && !errors.time}  
                  placeholder="enter duration of the movie"
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                  autoFocus
                  required
                />
              <Form.Control.Feedback type="invalid">
                {errors.time}
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="item-feature-key">
                  Story Line * |
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="storyline"
                  className="text-capitalize"
                  id="item-feature-value"
                  // value={values.storyline}
                  isValid={touched.storyline && !errors.storyline}  
                  placeholder="enter story line of the movie"
                  onChange={(e) => {
                    setStoryline(e.target.value);
                  }}
                  autoFocus
                  required
                />
                 <Form.Control.Feedback type="invalid">
                {errors.storyline}
              </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput5"
              >
                <Form.Label className="item-feature-key">
                  Movie Poster URL * |
                </Form.Label>
                <Form.Control
                  type="text"
                  name="posterImg"
                  className="text-capitalize"
                  id="item-feature-value"
                  // value={values.posterImg}
                  isValid={touched.posterImg && !errors.posterImg}  
                  placeholder="enter official poster URL of the movie"
                  onChange={(e) => {
                    setPosterImg(e.target.value);
                  }}
                  autoFocus
                  required
                />
              <Form.Control.Feedback type="invalid">
                {errors.posterImg}
              </Form.Control.Feedback>
              </Form.Group>
              <Modal.Footer>
                <Button variant="success" type="submit">
                  Add & Save
                </Button>
                <Button variant="secondary" onClick={handleModalClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Form>
          )}
          </Formik>
          </Modal.Body>
        </Modal>
      </Container>
    </nav>
  );
}
