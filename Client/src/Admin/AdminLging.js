import React, { useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
function AdminLging() {
  const Navigation = useNavigate();
  const [error, setError] = useState("");
  const usernameRef = useRef();
  const PasswordRef = useRef();
  const submit = async(e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = PasswordRef.current.value;
  if(!username||!password){
    setError('Pleasse Fill In All Fields');
    return ;
  }
  if(username!=="jasir"){
    setError("Please Enter Correct User Name");
    return;
  }
  if(password!=="1234"){
    setError("Please Enter Correct Password")
  }
  try {
    const data={
      username:username,
      password:password
    };
    const response=await  axios.post("https://e-commerce-ds4q.onrender.com/admin/login",data)
    localStorage.setItem("admin_Token",response.data.token)
    toast.success('Admin Login Success')
    Navigation('/addminhome')
  } catch (error) {
    toast.error("Pleas Enter Valied User Name Or Password"||error)
  }
    // const user = admin.find(
    //   (item) => item.userName === username && item.password === password
    // );
    // if (user) {
    //   toast.success("Thank You Login");
    //   Navigation("/addminhome");
    // } else {
    //   toast.error("User Not Found");
    //   setError("Login failed. Invalid username or password.");
    // }
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
        <h1 className="mt-3" style={{ fontFamily: "serif" }}>
          Admin Login
        </h1>
        <p className="mt-4">Please enter Admin username and password!</p>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          className="rounded mt-4 w-50 p-2"
          style={{
            background: "#176BEF ",
            border: "1px",
            color: "white",
            fontWeight: "600",
          }}
          onClick={submit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLging;
