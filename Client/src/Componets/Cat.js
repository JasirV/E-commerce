import React, { useContext } from "react";
import { AllContext } from "../App";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { Footer } from "./Footer";

const Cat = () => {
  const { product } = useContext(AllContext);
  const Navigate = useNavigate();
  const catProduct = product.filter((item) => item.Animal === "Cat");
  return (
    <div>
      <Navigation />
      <hr />
      <div className="d-flex flex-wrap m-3 justify-content-center">
        {catProduct.map((item, index) => (
          <Card
            onClick={() => {
              Navigate(`/View/${item.Id}`);
            }}
            key={item.id || index}
            className="m-2"
            style={{ width: "16rem", overflow: "hidden" }}>
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

export default Cat;
