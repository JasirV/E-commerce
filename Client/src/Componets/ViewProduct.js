import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./Navigation";
import { Axios,  } from "../App";

const ViewProduct = () => {
  const [product,setProduct] = useState(null);
  const { Id } = useParams();
  const userId=localStorage.getItem("userId")
  

useEffect(()=>{
  const viewProduct=async ()=>{
    try {
      const response=await Axios.get(`/users/products/${Id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.log("Error fetching the Product",error);
      toast.error("error")
      
    }
  };
  viewProduct();
},[Id]);

const addToCart=async ()=>{
  try {
    const response =await Axios.post(`/users/${userId}/cart`,{
      productId:Id,
    });
    console.log(response);
    if(response){
      await Axios.get(`/users/${userId}/cart`);
      return toast.success("Add To Cart")
    }
  } catch (error) {
    console.error("Error adding Prodct TO The Cart",error)
    toast.error(error.response.data.message);
  }
};


  // const ViewProduct = product.filter((item) => item.Id === parseInt(Id));
  // console.log(loginUser);
  // const addItem = () => {
  //   if (login) {
  //     const [newpro] = ViewProduct;
  //     const filterCart = loginUser.order.filter(
  //       (item) => item.Id === newpro.Id
  //     );
  //     if (filterCart.length > 0) {
  //       toast.error("product already set to cart");
  //       setBtn(false);
  //     } else {
  //       loginUser.order.push({ ...newpro, qty: 1 });
  //       console.log(userData);
  //       toast.success("Successful add to cart");
  //     }
  //   } else {
  //     toast.error("Please Loging");
  //     navigate("/login");
  //   }
  // };
  // console.log(userData);
  return (
    <>
      <Navigation />
      <div className="mt-3">
        {product&&(
          <Card
            key={product._id}
            style={{ width: "16rem", overflow: "hidden", margin: "auto" }}>
            <Card.Img
              variant="top"
              style={{ width: "16rem", height: "25rem" }}
              src={product.image}
            />
            <Card.Body>
              <h6 className="mt-1">₹{product.price}</h6>
              <Card.Title>{product.title}</Card.Title>
                <Button onClick={addToCart} type="primary">
                  Add To Cart
                </Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
};

export default ViewProduct;
