import React from 'react'
import SaidBar from './SaidBar'
import { useContext } from 'react'
import { AllContext } from '../App'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit'

const AdminProduct = () => {
    const { product, setProduct } = useContext(AllContext)
    const Navigation = useNavigate();
    const handleChange = (Id) => {
        const update = product.filter((item) => item.Id !== Id)
        setProduct(update);
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
                        key={item.id || index}
                        className="m-2"
                        style={{ width: "16rem", overflow: "hidden" }}>
                        <Card.Img
                            variant="top"
                            style={{ width: "16rem", height: "25rem" }}
                            src={item.Image}
                        />
                        <Card.Body>
                            <h6 className="mt-1">₹{item.Price}</h6>
                            <del className="text-secondary">₹{item.OldPrice}</del>
                            <Card.Title>{item.ProductName}</Card.Title>
                            <MDBIcon far icon="edit" className='mx-2 p-2' onClick={() => Navigation(`/ProductEdit/${item.Id}`)} />
                            <MDBIcon fas icon="trash" className='mx-2 p-2' onClick={() => { handleChange(item.Id) }} />
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default AdminProduct