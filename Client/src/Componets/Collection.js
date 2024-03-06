import React, { useContext } from "react";
import { AllContext } from "../App";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { Footer } from "./Footer";
const Collection = () => {
  const { product, search } = useContext(AllContext);
  const Navigate = useNavigate();
  const Search = product.filter((item) => {
    if (search === "") {
      return item;
    } else if (item.ProductName.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else {
      return "";
    }
  });

  return (
    <div>
      <div></div>
      <div>
        <hr />
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h5
            className="mx-5"
            style={{
              textAlign: "center",
              fontSize: "2.5em",
              fontWeight: "bold",
            }}>
            All Product
          </h5>
        </div>
        <div className="d-flex flex-wrap m-3 justify-content-center">
          {Search.map((item, index) => (
            <Card
              onClick={() => {
                Navigate(`/View/${item.Id}`);
              }}
              key={item.id || index}
              className="m-2"
              style={{
                width: "16rem",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}>
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
                  className="img-fluid m-2"
                  variant="top"
                  src={item.Image}
                  alt={item.ProductName}
                  style={{
                    height: "16rem",
                    width: "12rem",
                    objectFit: "cover",
                  }}
                />
              </div>

              <Card.Body>
                <h6 className="mt-1">₹{item.Price}</h6>
                {item.OldPrice && (
                  <del
                    className="text-secondary"
                    style={{ fontSize: "0.9rem" }}>
                    ₹{item.OldPrice}
                  </del>
                )}
                <Card.Title
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginTop: "0.5rem",
                  }}>
                  {item.ProductName}
                </Card.Title>
                <Button variant="primary" style={{ marginTop: "1rem" }}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collection;
