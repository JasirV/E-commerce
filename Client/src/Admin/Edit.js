import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SaidBar from "./SaidBar";
import { toast } from "react-toastify";
import axios from "axios";
import { AXIOS } from "../App";

function Edit() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const handleImageChange = (img) => {
    const selectedImage = img.target.files[0];
    setImage(selectedImage);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handileAdd = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !image || !category || !stock) {
      toast.error("Please fill in all fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("stock", stock);

    try {
      const jwtToken={
        headers:{
          'Content-Type':'multipath/form-data',
          Authorizaton:localStorage.getItem('admin_Token')
        }
      }
      const response = await AXIOS.post("/admin/products", formData,jwtToken);
      if (response.status === 201) {
        toast.success("Product added successfully!");
        navigate("/addminprodut");
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error uploading product:", error.message);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="d-flex ">
      <div>
        <SaidBar />
      </div>
      <div
        fluid
        className="mt-3 w-75"
        style={{ margin: "auto", overflow: "auto", height: "90vh" }}>
        <Form className="rounded shadow p-5 mb-5 bg-white">
          <Form.Group className="mb-3" controlId="formProductName">
            <Form.Label>
              <h6>Product Name</h6>
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Product Name"
              onChange={(e)=>setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>
              <h6>Price</h6>
            </Form.Label>
            <Form.Control
              type="text"
              name="price"
              placeholder="Price"
              onChange={(e)=>setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>
              <h6>Description</h6>
            </Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e)=>setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>
              <h6>Image</h6>
            </Form.Label>
            <Form.Control
               type="file"
               name="image"
              onChange={handleImageChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>
              <h6>Animal</h6>
            </Form.Label>
            <select

              onChange={handleChangeCategory}
              >
                
                <option >select</option>
                <option value="dog">DOG</option>
                <option value="cat">CAT</option>
              </select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>
              <h6>Stock</h6>
            </Form.Label>
            <Form.Control
              type="datalist"
              name="stock"
              placeholder="Stock"
              onChange={(e)=>setStock(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handileAdd}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Edit;
