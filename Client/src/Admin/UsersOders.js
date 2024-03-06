import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import SaidBar from "./SaidBar";
import { Card } from "react-bootstrap";
import { AllContext } from "../App";

const UsersOders = () => {
  const { userData } = useContext(AllContext);
  const { Id } = useParams();
  const userProduct = userData.find((item) => item.userName === Id);
  const [mapData, setMapData] = useState(userProduct.order);
  return (
    <div className="d-flex">
      <div>
        <SaidBar />
      </div>
      <div
        fluid
        className="d-flex flex-wrap m-5"
        style={{ margin: "auto", overflow: "auto", height: "90vh" }}>
        {mapData.map((item, index) => (
          <Card
            key={item.id || index}
            className="m-2"
            style={{ width: "16rem", overflow: "hidden" }}>
            <Card.Img
              className="img-fluid"
              variant="top"
              src={item.Image}
              style={{ height: "25rem" }}
            />
            <Card.Body>
              <h6 className="mt-1">₹{item.Price}</h6>
              <del className="text-secondary">₹{item.OldPrice}</del>
              <Card.Title>{item.ProductName}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UsersOders;
