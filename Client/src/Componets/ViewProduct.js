import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AllContext } from "../App";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./Navigation";

const ViewProduct = () => {
  const navigate = useNavigate();
  const [btn, setBtn] = useState(true);
  const { product, login, userData, loginUser } = useContext(AllContext);
  const { Id } = useParams();
  const ViewProduct = product.filter((item) => item.Id === parseInt(Id));
  console.log(loginUser);
  const addItem = () => {
    if (login) {
      const [newpro] = ViewProduct;
      const filterCart = loginUser.order.filter(
        (item) => item.Id === newpro.Id
      );
      if (filterCart.length > 0) {
        toast.error("product already set to cart");
        setBtn(false);
      } else {
        loginUser.order.push({ ...newpro, qty: 1 });
        console.log(userData);
        toast.success("Successful add to cart");
      }
    } else {
      toast.error("Please Loging");
      navigate("/login");
    }
  };
  console.log(userData);
  return (
    <>
      <Navigation />
      <div className="mt-3">
        {ViewProduct.map((item, index) => (
          <Card
            key={item.Id || index}
            style={{ width: "16rem", overflow: "hidden", margin: "auto" }}>
            <Card.Img
              variant="top"
              style={{ width: "16rem", height: "25rem" }}
              src={item.Image}
            />
            <Card.Body>
              <h6 className="mt-1">₹{item.Price}</h6>
              <del className="text-secondary">₹{item.OldPrice}</del>
              <Card.Title>{item.ProductName}</Card.Title>
              {btn ? (
                <Button onClick={addItem} type="primary">
                  Add To Cart
                </Button>
              ) : (
                <Button onClick={() => navigate("/Cart")} type="primary">
                  <i class="fab fa-opencart"></i>
                </Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ViewProduct;
