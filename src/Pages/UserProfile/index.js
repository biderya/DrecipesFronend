import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import MyLayout from "../../Components/MyLayout/index";
import { useHistory } from "react-router-dom";

const UserProfile = (props) => {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  let history = useHistory();
  // const token = localStorage.getItem("token");
  // console.log("id::::::::::::::::::::::::::::::::::::::::::::::", props.id);
  useEffect(() => {
    axios
      .get(`users/${props.id}`)
      .then((result) => {
        console.log(result.data.data.name);
        setUserName(result.data.data.name);
        setUserEmail(result.data.data.email);
        setUserRole(result.data.data.role);
        setToken(result.data.token);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const updateName = (e) => {
    setUserName(e.target.value);
  };
  const updateEmail = (e) => {
    setUserEmail(e.target.value);
  };
  const updateRole = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserData = () => {
    console.log("token", token);
    axios
      .put("users/" + props.id, {
        name: userName,
        email: userEmail,
      })
      .then((result) => {
        console.log(result.data.data.name);
        setUserName(result.data.data.name);
        setUserEmail(result.data.data.email);
        setUserRole(result.data.data.role);
      })
      .catch((err) => console.log(err.message));

    setShowAlert(true);
  };

  return (
    <MyLayout>
      <div>
        <div
          className="d-flex justify-content-start"
          class="w-100 p-4"
          style={{ height: 0 }}
        >
          <Alert show={showAlert} variant="success">
            {/* <Alert.Heading>Амжилттай өөрчлөгдлөө!</Alert.Heading> */}
            <div className="d-flex justify-content-between">
              <p>Хэрэглэгчийн мэдээлэл амжилттай солигдлоо!</p>
            </div>
          </Alert>
        </div>
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Хэрэглэгчийн нэр</Form.Label>
            <Form.Control
              type="text"
              placeholder="Хэрэглэгчийн нэр"
              defaultValue={userName}
              onChange={(e) => {
                updateName(e);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Хэрэглэгчийн имэйл хаяг - {token}</Form.Label>
            <Form.Control
              type="email"
              placeholder="Хэрэглэгчийн имэйл хаяг"
              defaultValue={userEmail}
              onChange={(e) => {
                updateEmail(e);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Хэрэглэгчийн role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Хэрэглэгчийн role"
              defaultValue={userRole}
              onChange={(e) => {
                updateRole(e);
              }}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <div>
            <div className="d-flex justify-content-center">
              <div className="p-2 col-example text-left">
                <Button
                  style={{ minWidth: 200 }}
                  variant="outline-warning"
                  type="submit"
                  onClick={() => history.goBack()}
                >
                  Буцах
                </Button>
              </div>
              <div className="p-2 col-example text-left">
                <Button
                  style={{ minWidth: 200 }}
                  variant="outline-success"
                  type="submit"
                  onClick={updateUserData}
                >
                  Хадгалах
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </MyLayout>
  );
};

export default UserProfile;
