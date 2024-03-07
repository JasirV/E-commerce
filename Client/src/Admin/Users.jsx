import React, { useState } from 'react';

import prologo from '../img/Profile-720.png';
import SaidBar from './SaidBar';
import { useNavigate } from 'react-router-dom';
import {AXIOS} from "../App"
import {toast} from "react-toastify"
import { useEffect } from 'react';


const Users = () => {
const [user,setUser]=useState([])
  const Navigate = useNavigate()
  useEffect(()=>{
    const allUsers=async()=>{
      try {
        const response =await AXIOS.get('/admin/users');
        console.log(response.data.data);
        setUser(response.data.data)
      } catch (error) {
        console.log(error);
        toast.error(error.message||"Faild to fetch users")
      }
    };
    allUsers();
  },[])
  return (
    <div className='d-flex'>
      <div>
        <SaidBar />
      </div>
      {user.length > 0 ? (
        <div fluid
          className="d-flex flex-wrap m-5 w-100" style={{ margin: "auto", overflow: "auto", height: "90vh" }}>
          <div fluid className='w-100 d-flex p-2'>
            <table className="table align-middle mb-0 bg-white">
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Email Id</th>
                  <th>Password</th>
                </tr>
              </thead>
              {user.map((item, index) => (
                <tbody key={item._id || index}>
                  <tr>
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={prologo}
                          alt=""
                          style={{ width: '45px', height: '45px' }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1" >{item.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-muted mb-0">{item.email}</p>
                    </td>
                    <td>
                    </td>
                    <td>
                      <button className='btn' onClick={() => { Navigate(`/users/${item.userName}`) }}><i class="fab fa-opencart"></i></button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>) : (<h1 style={{ margin: "auto" }}>NO USERS</h1>)
      }
    </div>
  );
};

export default Users;
