import React, { useContext, useEffect, useState } from "react";
import { AllContext } from "../App";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { Footer } from "./Footer";
import axios from "axios";
import { Axios } from "../App";
import { toast } from "react-toastify";
const userId=localStorage.getItem('userId');
const Cat = () => {
  const Navigate = useNavigate();
  const{search}=useContext(AllContext)
  const [product,setProduct]=useState([])
  const category="cat"

  useEffect(()=>{
    const catProducts=async ()=>{
      try {
        const response=await axios.get(`http://localhost:3001/users/products/category/${category}`)
        setProduct(response.data.product)
        console.log(response.data.product);
      } catch (error) {
        console.log("Error fetching the Product",error)
        toast.error("error");
      }
    };
    catProducts();
  },[]);
  const Search = product.filter((item) => {
    if (search === "") {
      return item;
    } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else {
      return "";
    }
  });

const addToWishList=async (id)=>{
  try {
    const response =await Axios.pos(`users/${userId}/wishlist`,{
      productId:id,
    })
    if(response.status===200){
      return toast.success("Product Added To The Whislist!")
    }
  } catch (error) {
    console.error('Error Adding Product To The Whislist',error);
    toast.error(error.response.data.message);
  }
}

  return (
    <div>
      <Navigation />
      <hr />
      <div className="d-flex flex-wrap m-3 justify-content-center">
  {Search.map((item, index) => (
    <Card
      onClick={() => {
        Navigate(`/View/${item._id}`);
      }}
      key={item._id || index}
      className="m-2 position-relative" 
      style={{ width: "16rem", overflow: "hidden" }}
    >
      <div
        style={{
          overflow: "hidden",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Card.Img
          className="img-fluid"
          variant="top"
          src={item.image}
          style={{ height: "16rem", width: "12rem" }}
        />
      </div>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mt-1">₹{item.price}</h6>
          
        </div>
        <Card.Title>{item.title}</Card.Title>
      </Card.Body>
    </Card>
  ))}
</div>
      <Footer />
    </div>
  );
};

export default Cat;
