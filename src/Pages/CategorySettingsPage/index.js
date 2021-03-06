import axios from "../../axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Alert,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import MyLayout from "../../Components/MyLayout";
import { Spinner } from "react-bootstrap";

const CategorySettingsPage = () => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [categoryDescription, setCategoryDescription] = useState(null);
  const [show, setShow] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(null);
  const [newCategoryDescription, setNewCategoryDescription] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleClose = () => {
    setShow(false);
    setShowNew(false);
    setData(null);
  };

  const updateCategoryName = (e) => {
    setCategoryName(e.target.value);
  };
  const updateCategoryDescription = (e) => {
    setCategoryDescription(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    setRefresh(false);
    axios
      .get("categories")
      .then((result) => {
        setLoading(false);
        setCategories(result.data.data);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [refresh]);

  const getCategory = async (id) => {
    setData(id);
    console.log("data2:", data);
    const result = await axios.get(`categories/${id}`);
    setCategoryId(result.data.data.id);
    setCategoryName(result.data.data.name);
    setCategoryDescription(result.data.data.description);
    setShow(true);
  };

  const showModal = () => {
    setShowNew(true);
  };

  const handleCategoryName = (e) => {
    setNewCategoryName(e.target.value);
  };
  const handleCategoryDescription = (e) => {
    setNewCategoryDescription(e.target.value);
  };

  const addCategory = () => {
    setLoading(true);
    axios
      .post(`categories`, {
        name: newCategoryName,
        description: newCategoryDescription,
        photo: "photo.jpg",
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

  const updateCategory = (id) => {
    setLoading(true);
    axios
      .put("categories/" + id, {
        name: categoryName,
        description: categoryDescription,
      })
      .then((result) => {
        console.log(result.data.data);
        setCategoryName(result.data.data.name);
        setCategoryDescription(result.data.data.description);
        setLoading(false);
        setShow(false);
        setData(null);
        setShowAlert(true);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });

    setRefresh(true);
  };

  const deleteCategory = (id) => {
    axios
      .delete("categories/" + id)
      .then((result) => {
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const onSub = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredCategories = categories.filter(
    (el) =>
      el.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      el.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      el.id.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <MyLayout>
      {loading ? (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: 20 }}
        >
          ???? ?????? ?????????????? ???? <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <hr />
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                ???????????????? ????????: /??????, ??????????????, id/
              </InputGroup.Text>
              <FormControl
                onChange={(e) => {
                  onSub(e);
                }}
                className="search-input"
                placeholder="???????? ?????????? ?????? ?????????????? ????"
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
              {/* <Alert.Heading>?????????????????? ??????????????????????!</Alert.Heading> */}
              <div className="d-flex justify-content-between">
                <p>???????? ???????????? ???????????? ?????????????????? ????????????!</p>
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
                  ????????
                </Button>
              </div>
            </Alert>
          </div>
          <div>
            <Table
              striped
              bordered
              hover
              size="sm"
              // style={{
              //   backgroundColor: "#E1F3FF",
              // }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>???????????????????? ??????</th>
                  <th>???????????????????? ??????????????</th>
                  <th>???????????????? id</th>

                  {/* <th>???????? ???????????????? ??????????</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredCategories != null &&
                  filteredCategories.map((el, index) => (
                    <tr key={el._id}>
                      <td>{index + 1}</td>
                      <td> {el.name}</td>
                      <td>{el.description}</td>
                      <td>{el.id} </td>
                      <td>
                        <Button
                          style={{
                            display: "block",
                            margin: "auto",
                            marginTop: 3,
                            width: 100,
                            backgroundColor: "#1d4ed8",
                          }}
                          size="sm"
                          onClick={() => getCategory(el.id)}
                          value={el.id}
                        >
                          ??????????????
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>???????????????????? ????????????????</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                              >
                                <Form.Label>???????????????????? ??????</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="???????????????????? ??????"
                                  defaultValue={categoryName}
                                  onChange={(e) => {
                                    updateCategoryName(e);
                                  }}
                                />
                                <Form.Text className="text-muted">
                                  We'll never share your email with anyone else.
                                </Form.Text>
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                              >
                                <Form.Label>???????????????????? ??????????????</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  defaultValue={categoryDescription}
                                  onChange={(e) => {
                                    updateCategoryDescription(e);
                                  }}
                                />
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              ????????
                            </Button>
                            <Button
                              className="bg-blue-600"
                              type="submit"
                              onClick={() => updateCategory(categoryId)}
                            >
                              ??????????????
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                      <td>
                        <Button
                          style={{
                            display: "block",
                            margin: "auto",
                            marginTop: 3,
                            width: 100,
                          }}
                          size="sm"
                          variant="danger"
                          onClick={() => deleteCategory(el.id)}
                          value={el}
                        >
                          ????????????
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div>
              <Button
                style={{ marginBottom: 50 }}
                className="bg-blue-700"
                type="submit"
                onClick={showModal}
              >
                ???????? ???????????????? ??????????
              </Button>
              <Modal show={showNew} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>???????? ???????????????????? ????????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>???????????????????? ??????</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="???????????????????? ??????"
                        onChange={(e) => {
                          handleCategoryName(e);
                        }}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>???????????????????? ??????????????</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={(e) => {
                          handleCategoryDescription(e);
                        }}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    ????????
                  </Button>
                  <Button
                    className="bg-blue-600"
                    type="submit"
                    onClick={addCategory}
                  >
                    ????????????????
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </MyLayout>
  );
};

export default CategorySettingsPage;
