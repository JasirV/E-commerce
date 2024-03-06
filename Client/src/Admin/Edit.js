import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { AllContext } from "../App";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SaidBar from "./SaidBar";

function Edit() {
  const { product, setProduct } = useContext(AllContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Id: 73,
    ProductName: "",
    OldPrice: "",
    Price: "",
    Image: "",
    Animal: "",
    Qty: 0,
    Stock: 0,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "ProductName") {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.ProductName.trim()) {
      newErrors.ProductName = "Product Name is required";
    }
    if (!formData.Price.trim()) {
      newErrors.Price = "Price is required";
    }
    if (!formData.Animal.trim()) {
      newErrors.Animal = "Animal is required";
    }
    if (!formData.Image.trim()) {
      newErrors.Image = "Image is required";
    }
    if (!formData.OldPrice.trim()) {
      newErrors.OldPrice = "Old Price is required";
    }
    if (formData.Stock <= 0) {
      newErrors.Stock = "Stock is required";
    }

    if (Object.keys(newErrors).length === 0) {
      setProduct([...product, { ...formData, Id: formData.Id + 1 }]);
      navigate("/addminprodut");
    } else {
      setErrors(newErrors);
    }
  };

  console.log(product);

  return (
    <div className="d-flex ">
      <div>
        <SaidBar />
      </div>
      <div
        fluid
        className="mt-3 w-75"
        style={{ margin: "auto", overflow: "auto", height: "90vh" }}>
        <Form
          className="rounded shadow p-5 mb-5 bg-white"
          onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formProductName">
            <Form.Label>
              <h6>Product Name</h6>
            </Form.Label>
            <Form.Control
              type="text"
              name="ProductName"
              placeholder="Product Name"
              value={formData.ProductName}
              onChange={handleInputChange}
            />
            {errors.ProductName && (
              <p className="text-danger">{errors.ProductName}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>
              <h6>Price</h6>
            </Form.Label>
            <Form.Control
              type="text"
              name="Price"
              placeholder="Price"
              value={formData.Price}
              onChange={handleInputChange}
            />
            {errors.Price && <p className="text-danger">{errors.Price}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>
              <h6>Old Price</h6>
            </Form.Label>
            <Form.Control
              type="text"
              name="OldPrice"
              placeholder="Price"
              value={formData.OldPrice}
              onChange={handleInputChange}
            />
            {errors.OldPrice && (
              <p className="text-danger">{errors.OldPrice}</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>
              <h6>Image</h6>
            </Form.Label>
            <Form.Control
              type="text"
              name="Image"
              placeholder="ImageURL"
              value={formData.Image}
              onChange={handleInputChange}
            />
            {errors.Image && <p className="text-danger">{errors.Image}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>
              <h6>Animal</h6>
            </Form.Label>
            <Form.Control
              type="datalist"
              name="Animal"
              placeholder="Animal"
              value={formData.Animal}
              onChange={handleInputChange}
            />
            {errors.Animal && <p className="text-danger">{errors.Animal}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>
              <h6>Stock</h6>
            </Form.Label>
            <Form.Control
              type="datalist"
              name="Stock"
              placeholder="Stock"
              value={formData.Stock}
              onChange={handleInputChange}
            />
            {errors.Stock && <p className="text-danger">{errors.Stock}</p>}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Edit;
