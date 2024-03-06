import React, { useContext, useEffect, useState } from "react";
import { AllContext } from "../App";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navigation from "./Navigation";
import { MDBIcon } from "mdb-react-ui-kit";

const Cart = () => {
  const Navigate = useNavigate();
  const {
    sale,
    product,
    totalPrice,
    setTotalPrice,
    setSale,
    itemsincart,
    setItemsincart,
    login,
    loginUser,
    setOffer,
    offer,
  } = useContext(AllContext);
  const [userCart, setUserCart] = useState([]);
  useEffect(() => {
    setUserCart(loginUser.order);
  }, []);

  useEffect(() => {
    if (!login) {
      setUserCart([]);
    } else {
    }
  }, [login, setUserCart]);
  const handleChange = (x) => {
    const ProductPrice = product.find((item) => item.Id === x);
    if (!ProductPrice) {
      return;
    }

    const updateCart = userCart.map((item) => {
      if (item.Id === x && item.qty < item.Stock) {
        return {
          ...item,
          qty: item.qty + 1,
          Price: parseFloat(item.Price) + parseFloat(ProductPrice.Price),
          OldPrice:
            parseFloat(item.OldPrice) + parseFloat(ProductPrice.OldPrice),
        };
      }
      return item;
    });
    setUserCart(updateCart);
  };

  const handleChangede = (x) => {
    const updateCart = userCart.map((item) => {
      if (item.Id === x && item.qty > 1) {
        const ProductPrice = product.find(
          (productItem) => productItem.Id === x
        );
        if (!ProductPrice) {
          return item;
        }
        return {
          ...item,
          qty: item.qty - 1,
          Price: parseFloat(item.Price) - parseFloat(ProductPrice.Price),
          OldPrice:
            parseFloat(item.OldPrice) - parseFloat(ProductPrice.OldPrice),
        };
      }
      return item;
    });

    setUserCart(updateCart);
  };

  const clear = () => {
    console.log("button Clicked");
    loginUser.order = [];
    setUserCart([]);
  };

  const remove = (x) => {
    const updatedCart = userCart.filter((item) => item.Id !== x);
    setUserCart(updatedCart);
    loginUser.order = updatedCart;
    toast.error("Your Product Is Removed");
  };

  useEffect(() => {
    if (userCart && userCart.length > 0) {
      const totalprice = userCart.reduce(
        (pre, curr) => pre + parseFloat(curr.Price),
        0
      );
      setTotalPrice(totalprice);

      const offer = userCart.reduce(
        (pre, curr) => pre + parseFloat(curr.OldPrice),
        0
      );
      setOffer(offer);

      const updateincriment = userCart.reduce((pre, curr) => pre + curr.qty, 0);
      setItemsincart(updateincriment);
    } else {
      setTotalPrice(0);
      setOffer(0);
      setItemsincart(0);
    }
  }, [userCart, setTotalPrice, setItemsincart, setOffer]);

  const OderNow = () => {
    setSale([...userCart]);

    console.log(sale);
    setUserCart([]);
  };
  const Buyproduct = (x) => {
    const buyitem = userCart.find((item) => item.Id === x);
    const remv = userCart.filter((item) => item.Id !== x);
    loginUser.order = remv;
    setUserCart(remv);
    sale.userCart.push({buyitem});
    toast.info("Your Product is Shipping");
  };

  return (
    <>
      <Navigation />
      <div className="d-flex flex-wrap m-5 ">
        {userCart &&
          userCart.length > 0 &&
          userCart.map((item) => (
            <Card
              className="m-2 mx-5"
              key={item.Id}
              style={{ width: "16rem", overflow: "hidden", margin: "auto" }}>
              <Card.Img
                className="img-fluid"
                variant="top"
                src={item.Image}
                style={{ height: "25rem" }}
              />
              <Card.Body>
                <Card.Title>{item.ProductName}</Card.Title>
                <Card.Text>Price: ₹{item.Price}</Card.Text>
                <Card.Text>
                  Old Price: <del>₹{item.OldPrice}</del>
                </Card.Text>
                <h5
                  className="border border-secondary p-2 w-50 mx-5"
                  style={{ borderRadius: "5rem" }}>
                  {item.qty}
                </h5>
                <button
                  className="rounded-circle"
                  style={{ width: "3rem", height: "3rem", border: ".2px" }}
                  onClick={() => {
                    handleChange(item.Id);
                  }}>
                  +
                </button>
                <button
                  className="rounded-circle m-2"
                  style={{ width: "3rem", height: "3rem", border: ".2px" }}
                  onClick={() => {
                    handleChangede(item.Id);
                  }}>
                  -
                </button>
                <br />
                <Button
                  className=" m-2"
                  onClick={() => {
                    Buyproduct(item.Id);
                  }}>
                  Buy
                </Button>
                <button
                  className=" m-2 btn btn-light"
                  onClick={() => {
                    remove(item.Id);
                  }}>
                  Remove
                </button>
              </Card.Body>
            </Card>
          ))}
      </div>
      {login ? (
        <div style={{ marginLeft: "20%" }}>
          <Card
            className="m-2 w-75 p-2 mr-5 shadow"
            style={{ overflow: "hidden" }}>
            <Card.Title>{}</Card.Title>
            <Card.Body>
              <h3>
                Total: <span className="text-success">₹{totalPrice}</span>
              </h3>
              <del className="text-secondary">₹{offer}</del>
              <h5>{itemsincart} Items</h5>
              <MDBIcon
                fas
                icon="truck"
                className="mt-2"
                onClick={() => {
                  Navigate("/Payment");
                  OderNow();
                }}
              />
              <br />
              <Button onClick={() => clear()} className="mt-2 btn btn-light">
                Clear Cart
              </Button>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <h1>NOProduct</h1>
      )}
    </>
  );
};

export default Cart;
