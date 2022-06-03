import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageUploader from "react-images-upload";
import { Card } from "react-bootstrap";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Table,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import MyLayout from "../../Components/MyLayout";

const MyCart = () => {
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [newFoodName, setNewFoodName] = useState(null);
  const [newFoodPhoto, setNewFoodPhoto] = useState(null);
  const [newFoodContent, setNewFoodContent] = useState(null);
  const [newFoodCalorie, setNewFoodCalorie] = useState(null);
  const [newFoodSteps, setNewFoodSteps] = useState(null);
  const [newFoodIngredients, setNewFoodIngredients] = useState(null);
  const [onDrop, setonDrop] = useState(this);

  const handleClose = () => {
    setShow(false);
    setShowNew(false);
    setData(null);
  };
  const handleFoodName = (e) => {
    setNewFoodName(e.target.value);
  };
  const handleFoodPhoto = (e) => {
    setNewFoodPhoto(e.target.value);
  };
  const handleFoodContent = (e) => {
    setNewFoodContent(e.target.value);
  };
  const handleFoodCalorie = (e) => {
    setNewFoodCalorie(e.target.value);
  };
  const handleFoodSteps = (e) => {
    setNewFoodSteps(e.target.value);
  };
  const handleFoodIngredients = (e) => {
    setNewFoodIngredients(e.target.value);
  };

  const onSub = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredFoods = foods.filter(
    (el) =>
      el.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      el.content.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    console.log(document.cookie);

    document.cookie =
      "limit=; expires=" + new Date(Date.now() - 360 * 24 * 60 * 60 * 1000);

    setLoading(true);
    setId(localStorage.getItem("id"));
    // cookie-gees limit-iig unshij avna
    axios
      .get(`users/${id}`)
      .then((result) => {
        console.log("ahhhhhhhhhhhhhhhhhhhhhhhh", result.data.data);
        setLoading(false);
        setFoods(result.data.data.cart);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response);
      });
  }, [refresh]);
  const showModal = () => {
    setShowNew(true);
  };
  const addFood = () => {
    setLoading(true);
    axios
      .post(`foods`, {
        name: newFoodName,
        photo: newFoodPhoto,
        content: newFoodContent,
        calorie: newFoodCalorie,
        rating: 4,
        steps: newFoodSteps,
        bestseller: false,
        success: true,
        deleted: null,
        loading: false,
        ingredients: newFoodIngredients,
      })
      .then((result) => {
        console.log(result.data.data);
        setLoading(false);
        setShowAlert(true);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
    setShowNew(false);
    setRefresh(true);
  };

  return (
    <MyLayout>
      {loading ? (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: 20 }}
        >
          Та түр хүлээнэ үү <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <hr />
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text>Хоол хайх: /нэр, тайлбар/</InputGroup.Text>
              <FormControl
                onChange={(e) => {
                  onSub(e);
                }}
                className="search-input"
                placeholder="Хайх утгаа энд оруулна уу"
                name="search"
              />
            </InputGroup>
          </div>
          <div
            className="d-flex justify-content-start"
            class="w-100 p-1"
            style={{ height: 0 }}
          >
            <Alert show={showAlert} variant="success">
              {/* <Alert.Heading>Амжилттай өөрчлөгдлөө!</Alert.Heading> */}
              <div className="d-flex justify-content-between">
                <p>Таны хийсэн үйлдэл амжилттай боллоо!</p>
                <Button
                  style={{
                    display: "block",
                    marginTop: 3,
                    width: 100,
                  }}
                  size="sm"
                  onClick={() => setShowAlert(false)}
                  variant="success"
                >
                  Хаах
                </Button>
              </div>
            </Alert>
          </div>

          <Row md="12" className="container-fluid contenedor text-center">
            {filteredFoods.map((el) => (
              <Col md="4" key={el._id}>
                <Link
                  to={`/foods/${el._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="">
                    <div className=" container text-center">
                      <div className="container_foto">
                        <div className="ver_mas text-center">
                          <h2>Үзэх</h2>
                        </div>
                        <article className="text-left">
                          <h2>{el.name}</h2>
                          <h4>{el.content}</h4>
                        </article>
                        <img
                          src={`http://localhost:8000/upload/${el.photo}`}
                          alt
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
          <div>
            <Button
              style={{ marginBottom: 50 }}
              variant="success"
              type="submit"
              onClick={showModal}
            >
              Шинэ орц нэмэх
            </Button>
            <Modal show={showNew} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Шинэ орцын мэдээлэл</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>орцын нэр</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="орцын нэр"
                      onChange={(e) => {
                        handleFoodName(e);
                      }}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>орцын calorie</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="орцын calorie"
                      onChange={(e) => {
                        handleFoodCalorie(e);
                      }}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Орцны тайлбар</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Орцны тайлбар"
                      onChange={(e) => {
                        handleFoodIngredients(e);
                      }}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Орцны зураг</Form.Label>
                    <div
                      style={{
                        display: "flex",
                        border: "1px solid red",
                      }}
                    >
                      <div style={{ marginRight: "15px" }}>
                        <input
                          type="file"
                          id="img"
                          name="img"
                          accept="image/*"
                          className="w-100"
                          onChange={(e) => {
                            handleFoodPhoto(e);
                          }}
                        />
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>орцын тайлбар</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={(e) => {
                        handleFoodContent(e);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>орцын алхам</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={(e) => {
                        handleFoodSteps(e);
                      }}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Хаах
                </Button>
                <Button variant="success" type="submit" onClick={addFood}>
                  Хадгалах
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}
    </MyLayout>
  );
};

export default MyCart;
