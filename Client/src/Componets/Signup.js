import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AllContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Signup = () => {
  const Navigation = useNavigate();
  const { user,setUser } = useContext(AllContext);
  const userNameRef = useRef(null);
  const emailIdRef = useRef(null);
  const passwordRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const emailId = emailIdRef.current.value;
    const password = passwordRef.current.value;
    if (!username || !emailId || !password) {
      setErrorMessage("Fill The Form");
      return;
    }
    const isEmailValid = emailId.includes("@") && emailId.includes(".");
    if (!isEmailValid) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    console.log(user);
    if (user.find((same) => same.userName === username)) {
      setErrorMessage(
        "Username already exists. Please choose a different one."
      );
      return;
    }
    setErrorMessage("");

    const value = {
      userName: username,
      emailId: emailId,
      password: password,
    };
    setUser([...user, value]);
    try {
      const data = {
        username: username,
        email: emailId,
        password: password
      };
    
      const response = await axios.post(
        "https://e-commerce-ds4q.onrender.com/users/register",
        data,
        {
          headers: {
            "Content-Type": "application/json" 
          }
        }
      );
    console.log(response);
      toast.success("Success");
      Navigation("/Login");
    } catch (err) {
      toast.error(err.message || "An error occurred");
    }
    
  };

  return (
    <div
      className="rounded shadow p-3 mb-5 bg-white "
      style={{
        margin: "auto",
        width: "25rem",
        marginTop: "10%",
      }}>
      <form>
        <h1 className="mt-3" style={{ fontFamily: "inherit" }}>
          SIGN UP
        </h1>
        <input
          ref={userNameRef}
          className="p-2 w-75 mt-3"
          style={{
            height: "2.5rem",
            border: "1px solid gray",
            borderRadius: ".5rem",
          }}
          type="text"
          placeholder="UserName"
        />
        <br />
        <input
          ref={emailIdRef}
          className="p-2 w-75 mt-4"
          style={{
            height: "2.5rem",
            border: "1px solid gray",
            borderRadius: ".5rem",
          }}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          ref={passwordRef}
          className="p-2 w-75 mt-4"
          style={{
            height: "2.5rem",
            border: ".5px solid gray",
            borderRadius: ".5rem",
          }}
          type="password"
          placeholder="Password"
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button
          className="rounded mt-4 w-50 p-2"
          style={{
            background: "#176BEF ",
            border: "1px",
            color: "white",
            fontWeight: "600",
          }}
          onClick={submit}>
          Sign up
        </button>
        <p className="mt-4">
          Already have an account?{" "}
          <Link style={{ textDecoration: "none" }} to={"/Login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
