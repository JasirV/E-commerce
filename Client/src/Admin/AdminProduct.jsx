import React, { useEffect, useState } from 'react'
import SaidBar from './SaidBar'
import { useContext } from 'react'
import { AXIOS, AllContext } from '../App'
import {  Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {  MDBIcon } from 'mdb-react-ui-kit'
import {toast} from 'react-toastify'
import axios from 'axios'



const AdminProduct = () => {
    const [product ,setProduct]=useState([])
    const Navigation = useNavigate();
   async function allProducts(){
try {
    const response=await AXIOS.get('/admin/products')
    console.log(response.data.data);
    
} catch (error) {
    console.log(error);
    toast.error(error.message || "Failed To Fetch Products")
}   
}
    useEffect(()=>{
        allProducts()
    },[])

const removeProduct=async (id)=>{
    try {
        const productId=id

        const response =await AXIOS.delete('admin/products',{data:{productId:productId}})
        allProducts();
        console.log(response);
    } catch (error) {
        console.log(error);
        toast.error('error.message'||"Failed To Fetch Products")
    }
}

    return (
        <div className='d-flex'>
            <div>
                <SaidBar />
            </div>

            <div fluid
                className="d-flex flex-wrap m-5" style={{ margin: "auto", overflow: "auto", height: "90vh" }}>
                {product.map((item, index) => (
                    <Card
                        key={item._id || index}
                        className="m-2"
                        style={{ width: "16rem", overflow: "hidden" }}>
                        <Card.Img
                            variant="top"
                            style={{ width: "16rem", height: "25rem" }}
                            src={item.image}
                        /> 
                        <Card.Body>
                            <h6 className="mt-1">₹{item.price}</h6>
                            <Card.Title>{item.title}</Card.Title>
                            <MDBIcon far icon="edit" className='mx-2 p-2' onClick={() => Navigation(`/ProductEdit/${item._id}`)} />
                            <MDBIcon fas icon="trash" className='mx-2 p-2' onClick={()=>{removeProduct(item._id)}} />
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default AdminProduct