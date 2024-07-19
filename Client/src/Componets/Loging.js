import React, {useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { AllContext } from "../App";

const Loging = () => {
  const Navigation = useNavigate();
  const [error, setError] = useState("");
  const usernameRef = useRef("");
  const PasswordRef = useRef("");
  const {setLoging}=useContext(AllContext)  
  const submit = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = PasswordRef.current.value;
    if(!username||!password){
      setError("Please fill in all fields");
      return
    }
    try {
      const data={
        username:username,
        password:password
      };
      const response= await axios.post(
        "https://e-commerce-ds4q.onrender.com/users/login",
        data
      );
      console.log(response);
      if(response.status===200){
        localStorage.setItem('user_Token',response.data.token);
        localStorage.setItem('userId',response.data.data.user._id);
        setTimeout(()=>{
          localStorage.removeItem('user_token');
          localStorage.removeItem('userId');
        },3600000)
        console.log(response.data.token);
        setLoging(true)
        toast.success("Thank You Loging");
        Navigation("/");
      }
      
    } catch (error) {
      console.error(error)
    }
    
    
    
    // const user = userData.find(
    //   (item) => item.userName === username && item.password === password
    // );
    // if (user) {
    //   setLoging(true);
    //   setLoginUser(user);
    //   toast.success("Thank You Loging");
    //   Navigation("/");
    // } else {
    //   toast.error("User Not Found");
    //   setError("Login failed. Invalid username or password.");
    // }
  };
  return (
    <div>
      <div>
        <Navigation />
      </div>

      <div
        className="rounded shadow p-3 mb-5 bg-white "
        style={{
          margin: "auto",
          width: "25rem",
          marginTop: "10%",
        }}>
        <form>
          <h1 className="mt-3" style={{ fontFamily: "serif" }}>
            LOGIN
          </h1>
          <p className="mt-4">Please enter your username and password!</p>
          <input
            ref={usernameRef}
            className="p-2 w-75 mt-2"
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
            ref={PasswordRef}
            className="p-2 w-75 mt-4"
            style={{
              height: "2.5rem",
              border: "1px solid gray",
              borderRadius: ".5rem",
            }}
            type="password"
            placeholder="Password"
          />
          <h6 className="mt-3 text-primary">Forgot Password</h6>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            className="rounded mt-2 w-50 p-2"
            style={{
              background: "#176BEF ",
              border: "1px",
              color: "white",
              fontWeight: "600",
            }}
            onClick={submit}>
            Login
          </button>
          <p className="mt-2">
            Don't have on account?
            <Link style={{ textDecoration: "none" }} to="/Signup">
              Signup
            </Link>
          </p>
          <i
            className="fas fa-user-secret"
            onClick={() => {
              Navigation("/adminLoging");
            }}></i>
        </form>
      </div>
    </div>
  );
};

export default Loging;
