import React, {  useEffect, useState } from "react";
import {  Axios } from "../App";
import { Button, Card,} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navigation from "./Navigation";
import { MDBIcon } from "mdb-react-ui-kit";
const userId=localStorage.getItem('userId')

const Cart = () => {
  const [cart,setCart]=useState([])
  const Navigate = useNavigate();
  console.log(userId);
  const fetchCat=async()=>{
    try {
      const response = await Axios.get(`users/${userId}/cart`);
      console.log(response.data);
      setCart(response.data.data)
    } catch (error) {
      console.log("Error fecthing the product",error);
      toast.error('Error');
    }
  }
  useEffect(()=>{
    fetchCat();
  },[])


  const RemoveCartItem=async(id)=>{
    try {
      const productId=id;
      const response=await Axios.delete(`users/${userId}/cart`,{data:{id:productId}})
      fetchCat();
    } catch (error) {
      console.log('Error fetching The Product',error);
      toast.error("error")
    }
  };

  const buyProduct =async()=>{
    console.log("run");
    try {
      const response =await Axios.post(`/users/${userId}/payment`);
      console.log(response.data.url);
      window.location.href=response.data.url
    } catch (error) {
      toast.error(error)
      console.log(error);
    }
  }
const handleQuantity=async (cartId,quantity)=>{
  const data={id:cartId,quantity};
  try {
    await Axios.put(`/users/${userId}/cart`,data);
    const response=await Axios.get(`/users/${userId}/cart`);
    if(response.status===200){
      return fetchCat()
    }
  } catch (error) {
    toast.error(error)
  }
}

const totalCartItem=(item)=>{
  return item.price*item.qty;
};

const clearCart=()=>{
  setCart([])
};

const totalCartPrice=cart.reduce((total,item)=>total+item.productId.price*item.quantity,0)

console.log(cart);



  // const {
  //   sale,
  //   product,
  //   totalPrice,
  //   setTotalPrice,
  //   setSale,
  //   itemsincart,
  //   setItemsincart,
  //   login,
  //   loginUser,
  //   setOffer,
  //   offer,
  // } = useContext(AllContext);
  // const [userCart, setUserCart] = useState([]);
  // useEffect(() => {
  //   setUserCart(loginUser.order);
  // }, []);

  // useEffect(() => {
  //   if (!login) {
  //     setUserCart([]);
  //   } else {
  //   }
  // }, [login, setUserCart]);
  // const handleChange = (x) => {
  //   const ProductPrice = product.find((item) => item.Id === x);
  //   if (!ProductPrice) {
  //     return;
  //   }

  //   const updateCart = userCart.map((item) => {
  //     if (item.Id === x && item.qty < item.Stock) {
  //       return {
  //         ...item,
  //         qty: item.qty + 1,
  //         Price: parseFloat(item.Price) + parseFloat(ProductPrice.Price),
  //         OldPrice:
  //           parseFloat(item.OldPrice) + parseFloat(ProductPrice.OldPrice),
  //       };
  //     }
  //     return item;
  //   });
  //   setUserCart(updateCart);
  // };

  // const handleChangede = (x) => {
  //   const updateCart = userCart.map((item) => {
  //     if (item.Id === x && item.qty > 1) {
  //       const ProductPrice = product.find(
  //         (productItem) => productItem.Id === x
  //       );
  //       if (!ProductPrice) {
  //         return item;
  //       }
  //       return {
  //         ...item,
  //         qty: item.qty - 1,
  //         Price: parseFloat(item.Price) - parseFloat(ProductPrice.Price),
  //         OldPrice:
  //           parseFloat(item.OldPrice) - parseFloat(ProductPrice.OldPrice),
  //       };
  //     }
  //     return item;
  //   });

  //   setUserCart(updateCart);
  // };

  // const clear = () => {
  //   console.log("button Clicked");
  //   loginUser.order = [];
  //   setUserCart([]);
  // };

  // const remove = (x) => {
  //   const updatedCart = userCart.filter((item) => item.Id !== x);
  //   setUserCart(updatedCart);
  //   loginUser.order = updatedCart;
  //   toast.error("Your Product Is Removed");
  // };

  // useEffect(() => {
  //   if (userCart && userCart.length > 0) {
  //     const totalprice = userCart.reduce(
  //       (pre, curr) => pre + parseFloat(curr.Price),
  //       0
  //     );
  //     setTotalPrice(totalprice);

  //     const offer = userCart.reduce(
  //       (pre, curr) => pre + parseFloat(curr.OldPrice),
  //       0
  //     );
  //     setOffer(offer);

  //     const updateincriment = userCart.reduce((pre, curr) => pre + curr.qty, 0);
  //     setItemsincart(updateincriment);
  //   } else {
  //     setTotalPrice(0);
  //     setOffer(0);
  //     setItemsincart(0);
  //   }
  // }, [userCart, setTotalPrice, setItemsincart, setOffer]);

  // const OderNow = () => {
  //   setSale([...userCart]);

  //   console.log(sale);
  //   setUserCart([]);
  // };
  // const Buyproduct = (x) => {
  //   const buyitem = userCart.find((item) => item.Id === x);
  //   const remv = userCart.filter((item) => item.Id !== x);
  //   loginUser.order = remv;
  //   setUserCart(remv);
  //   sale.userCart.push({buyitem});
  //   toast.info("Your Product is Shipping");
  // };

  return (
    <>
      <Navigation />
      <div className="d-flex flex-wrap m-5 ">
          {cart.map((item) => (
            <Card
              className="m-2 mx-5"
              key={item.productId._id}
              style={{ width: "16rem", overflow: "hidden", margin: "auto" }}>
              <Card.Img
                className="img-fluid"
                variant="top"
                src={item.productId.image}
                style={{ height: "25rem" }}
              />
              <Card.Body>
                <Card.Title>{item.productId.title}</Card.Title>
                <Card.Text>Price: ₹{item.productId.price}</Card.Text>
                <Card.Text>
                </Card.Text>
                <h5
                  className="border border-secondary p-2 w-50 mx-5"
                  style={{ borderRadius: "5rem" }}>
                  {item.quantity}
                </h5>
                <button
                  className="rounded-circle"
                  style={{ width: "3rem", height: "3rem", border: ".2px" }}
                  onClick={() => {
                    handleQuantity(item._id,1);
                  }}
                  >
                  +
                </button>
                <button
                  className="rounded-circle m-2"
                  style={{ width: "3rem", height: "3rem", border: ".2px" }}
                  onClick={() => {
                    handleQuantity(item._id,-1);
                  }}>
                  -
                </button>
                <br />
                {/* <Button
                  className=" m-2"
                  onClick= {buyProduct}>
                  Buy
                </Button> */}
                <button
                  className=" m-2 btn btn-light"
                  onClick={() => {
                    RemoveCartItem(item.productId._id);
                  }}>
                  Remove
                </button>
              </Card.Body>
            </Card>
          ))}
      </div>
        <div style={{ marginLeft: "20%" }}>
          <Card
            className="m-2 w-75 p-2 mr-5 shadow"
            style={{ overflow: "hidden" }}>
            <Card.Title></Card.Title>
            <Card.Body>
              <h3>
                Total: <span className="text-success">₹{totalCartPrice}</span>
              </h3>
              {/* <del className="text-secondary">₹{offer}</del> */}
              <h5>{totalCartItem} Items</h5>
              <MDBIcon
                fas
                icon="truck"
                className="mt-2"
                onClick={buyProduct}
              />
              <br />
              <Button onClick={clearCart} className="mt-2 btn btn-light">
                Clear Cart
              </Button>
            </Card.Body>
          </Card>
        </div>
    </>
  );
};

export default Cart;
