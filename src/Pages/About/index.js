import React, { useState, useEffect } from "react";
import { Tab, Row, Col, ListGroup } from "react-bootstrap";
import MyLayout from "../../Components/MyLayout";
import axios from "../../axios";

const About = () => {
  const [data, setData] = useState(null);
  const [categoryFoods, setCategoryFoods] = useState(null);

  const getCategoryFoods = async (id) => {
    const result = await axios.get(`categories/${id}/foods`);
    setCategoryFoods(result.data.data);
  };

  //getCategories, getcategoryFoods, getFood

  return (
    <MyLayout>
      <div>
        {categoryFoods.map((el, index) => (
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
              <Col sm={3}>
                <ListGroup>
                  <ListGroup.Item
                    action
                    href={el.name}
                    onClick={() => getCategoryFoods(el.id)}
                  >
                    {el.id}
                  </ListGroup.Item>
                  {/* <ListGroup.Item action href="#link2">
                  Link 2
                </ListGroup.Item> */}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey={el.name}>{el.content}</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        ))}
      </div>
    </MyLayout>
  );
};
export default About;
