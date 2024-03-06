import React, { useContext, useState } from "react";
import { AllContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

const ProductEdit = () => {
  const { product, setProduct, userData, setUserData } = useContext(AllContext);
  const { Id } = useParams();
  const Navigation = useNavigate();
  const ViewProduct = product.find((item) => item.Id === parseInt(Id));
  const [formData, setFormData] = useState({
    Id: ViewProduct.Id,
    ProductName: ViewProduct.ProductName,
    OldPrice: ViewProduct.OldPrice,
    Price: ViewProduct.Price,
    Image: ViewProduct.Image,
    Animal: ViewProduct.Animal,
    Qty: ViewProduct.Qty,
    Stock: ViewProduct.Stock,
  });

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

  const onSubmit = () => {
    const updatedProducts = product.map((item) =>
      item.Id === parseInt(Id) ? { ...item, ...formData } : item
    );
    setProduct(updatedProducts);
    const userCartUpdate = userData.map((item) => {
      if (item && item.orders) {
        const ordersArray = [...item.orders];
        const data = ordersArray.map((it) =>
          it.Id === parseInt(Id) ? { ...it, ...formData } : it
        );

        return { ...item, orders: data };
      } else {
        return item;
      }
    });

    setUserData(userCartUpdate);
  };
  return (
    <div style={{ height: "100vh" }}>
      <div class="card mb-3 mt-5" style={{ maxWidth: "540px", margin: "auto" }}>
        <div className="card-body">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th scope="row">Product Name</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleInputChange}
                    name="ProductName"
                    defaultValue={ViewProduct.ProductName}
                    type="text"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Price</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleInputChange}
                    name="Price"
                    type="text"
                    defaultValue={ViewProduct.Price}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Old Price</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleInputChange}
                    name="OldPrice"
                    type="text"
                    defaultValue={ViewProduct.OldPrice}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Stock</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleInputChange}
                    name="Stock"
                    type="text"
                    defaultValue={ViewProduct.Stock}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Animal</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleInputChange}
                    name="Animal"
                    type="text"
                    defaultValue={ViewProduct.Animal}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Qut</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleInputChange}
                    name="Qty"
                    type="text"
                    defaultValue={ViewProduct.Qty}
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">Image</th>
                <td>
                  <input
                    className="form-control"
                    onChange={handleInputChange}
                    name="Image"
                    type="text"
                    defaultValue={ViewProduct.Image}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            onClick={() => {
              onSubmit();
              Navigation("/addminprodut");
            }}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
