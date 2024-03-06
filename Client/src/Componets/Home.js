import React from "react";
import {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselItem,
} from "mdb-react-ui-kit";
import image from "../img/Cat-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { Footer } from "./Footer";
import Collection from "./Collection";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <div>
        <MDBCarousel showControls>
          <MDBCarouselItem itemId={1}>
            <img
              src="https://cdn.royalcanin-weshare-online.io/YiKN3GsBaxEApS7LJiHi/v1/69-uk-global-dog-and-cat-eating-with-crown-news-black-and-white-colour"
              className="d-block w-100"
              alt="..."
            />
            <MDBCarouselCaption
              style={{
                position: "absolute",
                left: "22%",
                transform: "translateX(-50%)",
                textAlign: "left",
                top: "50%",
                marginTop: "-50px",
                width: "80%",
                maxWidth: "600px",
              }}>
              <button
                type="button"
                className="btn btn-outline-danger w-50"
                onClick={() => {
                  navigate("/collection");
                }}>
                BUY NOW
              </button>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId={2}>
            <img
              src="https://orchiddigitals.com/wp-content/uploads/2020/08/royal-canin-logo-with-dog-pic.jpg.webp"
              className="d-block w-100"
              alt="..."
            />
            <MDBCarouselCaption>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  navigate("/Dog");
                }}>
                BUY NOW
              </button>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId={3}>
            <img src={image} className="d-block w-100" alt="..." />
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {
                navigate("/Cat");
              }}>
              BUY NOW
            </button>
          </MDBCarouselItem>
        </MDBCarousel>
      </div>
      <Collection />
      <Footer />
    </>
  );
};

export default Home;
