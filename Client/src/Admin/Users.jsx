import React from 'react';
import { useContext } from 'react';
import { AllContext } from '../App';
import prologo from '../img/Profile-720.png';
import SaidBar from './SaidBar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Users = () => {
  const { userData } = useContext(AllContext);
  const Navigate = useNavigate()
  return (
    <div className='d-flex'>
      <div>
        <SaidBar />
      </div>
      {userData.length > 0 ? (
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
              {userData.map((item, index) => (
                <tbody key={item.Id || index}>
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
                          <p className="fw-bold mb-1" >{item.userName.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-muted mb-0">{item.emailId}</p>
                    </td>
                    <td>
                      <p>{item.password}</p>
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
