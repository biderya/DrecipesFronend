import React from "react";
import { Card } from "react-bootstrap";
import food from "../../assets/food.jpg";

function MyCard() {
  return (
    <>
      <Card className={`fj-card`} style={{ marginBottom: "20px" }}>
        <div className="card-body-wrapper">
          <div className="view overlay">
            <Card.Img src={food} alt="" />
          </div>
          <Card.Body>
            <Card.Title className="card-main-title">Title</Card.Title>
            <Card.Text>Тайлбар</Card.Text>
          </Card.Body>
        </div>
      </Card>
    </>
  );
}

export default MyCard;
