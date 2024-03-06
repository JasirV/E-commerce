import React, { useContext } from "react";
import { AllContext } from "../App";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import Navigation from "./Navigation";

const Dog = () => {
  const { product } = useContext(AllContext);
  const Navigate = useNavigate();
  const dogProduct = product.filter((iteam) => iteam.Animal === "Dog");
  return (
    <div>
      <Navigation />
      <div className="d-flex flex-wrap m-3 justify-content-center">
        {dogProduct.map((item, index) => (
          <Card
            onClick={() => {
              Navigate(`/View/${item.Id}`);
            }}
            key={item.id || index}
            className="m-2"
            style={{ width: "16rem", overflow: "hidden", margin: "auto" }}>
            <div
              style={{
                overflow: "hidden",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}>
              <Card.Img
                className="img-fluid"
                variant="top"
                src={item.Image}
                style={{ height: "16rem", width: "12rem" }}
              />
            </div>
            <Card.Body>
              <h6 className="mt-1">₹{item.Price}</h6>
              <del className="text-secondary">₹{item.OldPrice}</del>
              <Card.Title>{item.ProductName}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Dog;
