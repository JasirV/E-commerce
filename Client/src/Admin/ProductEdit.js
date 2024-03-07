import React, { useContext, useState } from "react";
import { AllContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import {toast} from "react-toastify"
import axios from "axios";
import {AXIOS} from "../App"
import { useEffect } from "react";

const ProductEdit = () => {
//  const { product, setProduct, userData, setUserData } = useContext(AllContext);
  const { Id } = useParams();
  const Navigation = useNavigate();
  const [product, setProduct] = useState({
    Id: "",
    ProductName: "",
    OldPrice: "",
    Price: "",
    Image: "",
    Animal: "",
    Qty: "",
    Stock: "",
  });

  useEffect(()=>{
    const fetchProduct =async ()=>{
      try {
        const response =await AXIOS.get(`/admin/${Id}/products`);
        console.log(response.data.product);
        const {_id,title,image,price,description,category}=response.data.product
        setProduct({
          id:_id,
          title,image,price,description,category
        })
      } catch (error) {
        console.log(error);
        toast.error(error.message||"Failed To Fetch Products");
      }
    };
    fetchProduct();
  },[Id])

const submit =async (e)=>{
  e.preventDefault();
  console.log("submit");
  try {
    const response=await AXIOS.put('/admin/products',product);
    console.log(response);
    if(response.status===200){
      toast.success("Product Editied SuccessFully");
      Navigation("/addminprodut")
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message)
  }
}

const handleChange=(e)=>{
  const {name,value}=e.target
  console.log(value);
  setProduct((pre)=>({
    ...pre,
    [name]:value,
  }));
};

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "ProductName") {
  //     setFormData({
  //       ...formData,
  //       [name]: value.toUpperCase(),
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  // const onSubmit = () => {
  //   const updatedProducts = product.map((item) =>
  //     item.Id === parseInt(Id) ? { ...item, ...formData } : item
  //   );
  //   setProduct(updatedProducts);
  //   const userCartUpdate = userData.map((item) => {
  //     if (item && item.orders) {
  //       const ordersArray = [...item.orders];
  //       const data = ordersArray.map((it) =>
  //         it.Id === parseInt(Id) ? { ...it, ...formData } : it
  //       );

  //       return { ...item, orders: data };
  //     } else {
  //       return item;
  //     }
  //   });

  //   setUserData(userCartUpdate);
  // };
  return (
    <div style={{ height: "100vh" }}>
      <div class="card mb-3 mt-5" style={{ maxWidth: "540px", margin: "auto" }}>
        <div className="card-body">
          <form onSubmit={submit}>
          <table class="table table-striped">
            <tbody>
              <tr>
                <th scope="row">Product Name</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    name="title"
                    id='title'
                    defaultValue={product.title}
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Price</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    name="price"
                    id='price'
                    type="text"
                    defaultValue={product.price}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Old Price</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    name="description"
                    id='description'
                    type="text"
                    defaultValue={product.description}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Stock</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    name="stock"
                    id='stock'
                    type="text"
                    defaultValue={product.Stock}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Animal</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    name="Category"
                    id="category"
                    type="text"
                    defaultValue={product.category}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Qut</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    name="qty"
                    id="qty"
                    type="text"
                    defaultValue={product.qty}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Image</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleChange}
                    name="image"
                    id='image'
                    type="text"
                    defaultValue={product.image}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Button variant="danger" className="px-3" onClick={()=>Navigation('/addminprodut')}>
            cancel
          </Button>
          <Button className=" mx-2" type="submit">
            Save
          </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
