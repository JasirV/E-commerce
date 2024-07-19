import React, { useContext, useEffect, useState } from "react";
import { AllContext, Axios } from "../App";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import Navigation from "./Navigation";
import {toast} from "react-toastify"
import axios from "axios";
const userId=localStorage.getItem('userId');

const Dog = () => {
  const Navigate = useNavigate();
  const [product,setProduct]=useState([])
  const category="dog"
  const {search}=useContext(AllContext)
useEffect(()=>{
  const DogProduct =async ()=>{
    try {
      const response=await axios.get(`https://e-commerce-ds4q.onrender.com/users/products/category/${category}`);
      setProduct(response.data.product)
      console.log(response.data.product);
    } catch (error) {
      console.log("Error Fetching The Product",error);
      toast.error('Error');
    }
  }
  DogProduct();
},[])

const addToWishList=async(id)=>{
  try {
    const response =await Axios.post(`users/${userId}/wishlist`,{productId:id});
    if(response.status===200){
      return toast.success('Prodct Added To The Whislist!')
    }
  } catch (error) {
    console.error('Error Adding To The Whislist',error);
    toast.error(error.response.data.message)
  }
}
const Search = product.filter((item) => {
  if (search === "") {
    return item;
  } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
    return item;
  } else {
    return "";
  }
});

  return (
    <div>
      <Navigation />
      <div className="d-flex flex-wrap m-3 justify-content-center">
        {Search.map((item, index) => (
          <Card
            onClick={() => {
              Navigate(`/View/${item._id}`);
            }}
            key={item._id || index}
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
                src={item.image}
                style={{ height: "16rem", width: "12rem" }}
              />
            </div>
            <Card.Body>
              <h6 className="mt-1">₹{item.price}</h6>
              <Card.Title>{item.title}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Dog;
