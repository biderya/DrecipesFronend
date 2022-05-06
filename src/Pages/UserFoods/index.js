import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import MyLayout from "../../Components/MyLayout";
import { SERVERAPI } from "../../constants/routes";

const UserFoods = () => {
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
      .get(`users/${id}/foods`)
      .then((result) => {
        console.log("ahhhhhhhhhhhhhhhhhhhhhhhh", result.data.data);
        setLoading(false);
        setFoods(result.data.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response);
      });
  }, []);

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

          <Row md="12">
            {filteredFoods.map((el) => (
              <Col md="3" key={el._id}>
                <Link
                  to={`/foods/${el._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card className={`fj-card`} style={{ marginBottom: "20px" }}>
                    <div className="card-body-wrapper">
                      <div className="view overlay">
                        <Card.Img
                          style={{ width: 253, height: 220 }}
                          variant="top"
                          src={`${SERVERAPI}/upload/` + el.photo}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title className="card-main-title">
                          {el.name}
                        </Card.Title>
                        <Card.Text>{el.content}</Card.Text>
                      </Card.Body>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </MyLayout>
  );
};

export default UserFoods;
