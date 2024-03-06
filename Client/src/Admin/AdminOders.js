import React, { useContext } from "react";
import SaidBar from "./SaidBar";
import { AllContext } from "../App";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

const AdminOders = () => {
  const { sale } = useContext(AllContext);
  console.log(sale);
  return (
    <div className="d-flex">
      <div>
        <SaidBar />
      </div>
      {sale.length > 0 ? (
        <div
          fluid
          className="mt-3"
          style={{
            overflow: "scroll",
            height: "90vh",
            overflow: "auto",
            height: "90vh",
          }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol md="10">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                    Shopping Cart
                  </MDBTypography>
                  <div>
                    <p className="mb-0">
                      <span className="text-warning">TOTAL </span>
                      <a href="#!" className="text-danger">
                        <i className="fas fa-angle-down mt-1"></i>
                      </a>
                    </p>
                  </div>
                </div>

                {sale.usercart.map((item, index) => (
                  <MDBCard key={item.Id || index} className="rounded-3 mb-4">
                    <MDBCardBody className="p-4">
                      <MDBRow className="justify-content-between align-items-center">
                        <MDBCol md="12" lg="6" xl="4">
                          <MDBCardImage
                            className="rounded-3"
                            fluid
                            src={item.Image}
                            alt="products"
                          />
                        </MDBCol>
                        <MDBCol md="12" lg="6" xl="8">
                          <p className="lead fw-normal mb-2">
                            {item.ProductName}
                          </p>
                          <p>
                            <span className="text-muted">
                              Animal:{item.Animal}{" "}
                            </span>
                            <br />
                            <span className="text-muted">
                              Stock:{item.Stock}{" "}
                            </span>
                          </p>
                        </MDBCol>
                        <MDBCol
                          md="12"
                          lg="6"
                          xl="4"
                          className="d-flex align-items-center justify-content-around">
                          <span className="border border-secondary p-3 mt-2">
                            {item.Qty}
                          </span>
                        </MDBCol>
                        <MDBCol md="12" lg="6" xl="4">
                          <MDBTypography tag="h5" className="mb-0">
                            ₹{item.Price}
                          </MDBTypography>
                        </MDBCol>

                        <MDBCol md="12" lg="6" xl="4" className="text-end">
                          <a href="#!" className="text-danger"></a>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                ))}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      ) : (
        <h1 style={{ margin: "auto" }}>NO ODRERS</h1>
      )}
    </div>
  );
};

export default AdminOders;
