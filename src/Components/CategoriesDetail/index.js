import React, { useEffect } from "react";
import axios from "../../axios";
import MyLayout from "../MyLayout";

import Alert from "react-bootstrap/Alert";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/solid";
const CategoriesDetail = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const onSub = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    document.cookie =
      "limit=; expires=" + new Date(Date.now() - 360 * 24 * 60 * 60 * 1000);
    setLoading(true);
    console.log(props.match.params.id);
    // cookie-gees limit-iig unshij avna
    axios
      .get(`categories/${props.match.params.id}/foods`)
      .then((result) => {
        setLoading(false);
        setCategories(result.data.data);
      })
      .catch((err) => {
        setLoading(true);
        setError(err.message);
      });
  }, []);
  const filteredCategories = categories.filter(
    (el) =>
      el.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      el.content.toLowerCase().includes(searchValue.toLowerCase())
  );
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
              <InputGroup.Text className="p-10">
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
            {filteredCategories.map((el) => (
              <Col md="4" key={el._id} className="">
                <Link
                  to={`/categories/${el._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="">
                    <div className=" container text-center">
                      <div className="container_foto">
                        <div className="ver_mas text-center">
                          <h2>Үзэх</h2>
                        </div>
                        <article className="text-left max-w-xs">
                          <h2>{el.name}</h2>
                          {/* <h4 className="truncate">{el.content}</h4> */}
                        </article>
                        <img src={foodImg} alt />
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
export default CategoriesDetail;
