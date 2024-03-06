import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SaidBar from "./SaidBar";
import { AllContext } from "../App";
import "../App.css";
import Chart from "react-apexcharts";
import "apexcharts";
import "apexcharts/dist/apexcharts.css";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const { userData, product, sale, itemsincart } = useContext(AllContext);
  const users = userData.length;
  const Products = product.length;
  const Sale = sale.length;
  const Navigate = useNavigate();

  const [state, setState] = useState({
    options: {
      colors: ["#E91E63", "#FF9800"],
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      },
    },
    series: [
      {
        name: "Profit",
        data: [42, 17, 93, 56, 30],
      },
    ],
  });

  return (
    <div className="d-flex ">
      <div>
        <SaidBar />
      </div>
      <div
        fluid
        style={{ overflow: "auto", height: "90vh" }}
        className="m-auto mt-3">
        <div className="container-fluid">
          <div className="row g-3 my-2">
            <div
              onClick={() => {
                Navigate("/addminprodut");
              }}
              className="col-md-3">
              <div className="p-5 bg-white shadow d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="f-2">{Products}</h3>

                  <p className="fs-5">Product</p>
                </div>
                <i className="bi bi-cart-plus p-3 fs-1"></i>
              </div>
            </div>

            <div
              className="col-md-3"
              onClick={() => {
                Navigate("/adminOders");
              }}>
              <div className="p-5 bg-white shadow d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="fs-2">{Sale}</h3>
                  <p className="fs-5">Sales</p>
                </div>
                <i className="bi bi-currency-exchange p-3 fs-1"></i>
              </div>
            </div>

            <div
              className="col-md-3"
              onClick={() => {
                Navigate("/adminOders");
              }}>
              <div className="p-5 bg-white shadow d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="fs-2">{itemsincart}</h3>
                  <p className="fs-5">Delivery</p>
                </div>
                <i className="bi bi-truck p-3 fs-1"></i>
              </div>
            </div>
            <div
              className="col-md-3"
              onClick={() => {
                Navigate("/users");
              }}>
              <div className="p-5 bg-white shadow d-flex justify-content-around align-items-center rounded">
                <div>
                  <h3 className="fs-2">{users}</h3>
                  <p className="fs-5">Users</p>
                </div>
                <i className="bi bi-person p-3 fs-1"></i>
              </div>
            </div>
            <div>
              <div className="App mt-5">
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <Chart
                      options={state.options}
                      series={state.series}
                      type="area"
                      width="100%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
