import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Link } from "react-router-dom";
import {Spinner } from "react-bootstrap";
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import MyLayout from "../../Components/MyLayout";
import "./style.css";
import foodImg from "../../assets/food.jpg";
import "./style.css";
// import { SERVERAPI } from "../../constants/routes";

const Foods = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const onSub = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    document.cookie =
      "limit=; expires=" + new Date(Date.now() - 360 * 24 * 60 * 60 * 1000);
    console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii", document.cookie);
    setLoading(true);

    // cookie-gees limit-iig unshij avna
    axios
      .get("foods")
      .then((result) => {
        setLoading(false);
        setFoods(result.data.data);
      })
      .catch((err) => {
        setLoading(true);
        setError(err.message);
      });
  }, []);

  const filteredFoods = foods.filter(
    (el) =>
      el.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      el.content.toLowerCase().includes(searchValue.toLowerCase())
  );
  // console.log("filteredFoods: ", filteredFoods);

  return (
    <MyLayout>
      {loading ? (
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: 200 }}
        >
          <Spinner animation="border" />
        </div>
      ) : (
        <div>
          <hr />
          <div>
            <InputGroup className="mb-3">
              <InputGroup.Text className="p-10 bg-[#f8f9fa]">
                Хоол хайх: /нэр, тайлбар/
              </InputGroup.Text>
              <FormControl
                onChange={(e) => {
                  onSub(e);
                }}
                className="search-input p-10 bg-blue-700"
                placeholder="Хайх утгаа энд оруулна уу"
                name="search"
              />
            </InputGroup>
          </div>

          <Row md="12" className="container-fluid contenedor text-center">
            {filteredFoods.map((el) => (
              <Col md="4" key={el._id} className="">
                <Link
                  to={`/foods/${el._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className=" rounded-2xl">
                    <div className=" container text-center">
                      <div className="container_foto rounded-xl">
                        <div className="ver_mas text-center">
                          <h2>Үзэх</h2>
                        </div>
                        <article className="text-left max-w-xs">
                          <h2>{el.name}</h2>
                          <h4 className="truncate">{el.content}</h4>
                        </article>
                        <img
                          src={`http://localhost:8000/upload/${el.photo}`}
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </MyLayout>
  );
};
export default Foods;
