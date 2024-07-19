import React, { useContext, useEffect, useState } from "react";
import { AllContext, Axios } from "../App";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";
const userId=localStorage.getItem('userId')
const Collection = () => {
  const Navigate=useNavigate()
  const {search,setSearch}=useContext(AllContext);
  const [products,setProduct]=useState([]);
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const allProducts = async () => {
      try {
        const response = await axios.get(
          'https://e-commerce-ds4q.onrender.com/users/products'
        );
        console.log(response);
        setProduct(response.data.product);
        setLoading(false)
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Failed to fetch Products");
      }
    };
  
    allProducts();
    const intervalId = setInterval(() => {
      allProducts();
      console.log('API called');
    }, 14 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);
  const Search = products.filter((item) => {
    if (search === "") {
      return item;
    } else if (item.title.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else {
      return "";
    }
  });
  
  // const Searches=products.filter((srch)=>{
  //   if(search===""){
  //     return srch
  //   }else if(srch.titile.toLowerCase().includes(search.toLowerCase())){
  //     return srch
  //   }else{
  //     return "";
  //   }
  // });


  const addToWishList =async (id)=>{
    try {
      const response =await Axios.post(`users/${userId}/wishlist`,{
        productId:id,
      })
      console.log(response);
    if(response.status===200){
      return toast.success("Product added to the wishlist!")
    }
    } catch (error) {
      console.error("Error adding Product to the whislist",error)
      toast.error(error.response.data.message)
    }
  }


  // const { product, search } = useContext(AllContext);
  // const Navigate = useNavigate();
  // const Search = product.filter((item) => {
  //   if (search === "") {
  //     return item;
  //   } else if (item.ProductName.toLowerCase().includes(search.toLowerCase())) {
  //     return item;
  //   } else {
  //     return "";
  //   }
  // });


  return (
    <>
    {loading?<Loading />:(
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
                Navigate(`/View/${item._id}`);
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
                  src={item.image}
                  alt={item.ProductName}
                  style={{
                    height: "16rem",
                    width: "12rem",
                    objectFit: "cover",
                  }}
                />
              </div>

              <Card.Body>
                <h6 className="mt-1">₹{item.price}</h6>
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
                  {item.title}
                </Card.Title>
                <Button variant="primary" style={{ marginTop: "1rem" }}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default Collection;
