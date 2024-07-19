import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loging from "./Componets/Loging";
import Signup from "./Componets/Signup";
import Payment from "./Componets/Payment";
import { Product } from "./Componets/ProducetData";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Componets/Home";
import Collection from "./Componets/Collection";
import Dog from "./Componets/Dog";
import Cat from "./Componets/Cat";
import ViewProduct from "./Componets/ViewProduct";
import Cart from "./Componets/Cart";
import AdminHome from "./Admin/AdminHome";
import Edit from "./Admin/Edit";
import Users from "./Admin/Users";
import AdminProduct from "./Admin/AdminProduct";
import AdminOders from "./Admin/AdminOders";
import ProductEdit from "./Admin/ProductEdit";
import PaymentSuccess from "./Componets/PaymentSuccess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminLging from "./Admin/AdminLging";
import UsersOders from "./Admin/UsersOders";
import axios from "axios";
import PaymentCancel from "./Componets/PaymentCanel";


export const Axios=axios.create({
  baseURL: 'https://e-commerce-ds4q.onrender.com/',
  headers:{
    "Content-Type":'application/json',
    Authorization:localStorage.getItem('user_Token'),
  },
});


export const AXIOS=axios.create({
  baseURL:'https://e-commerce-ds4q.onrender.com/',
  headers:{
    "Content-Type": "application/json",
    Authorization:localStorage.getItem("admin_Token")
  },
})

export const AllContext = createContext();
function App() {
  
  const [userData, setUserData] = useState([]);
  
  const [totalPrice, setTotalPrice] = useState();
  const [offer, setOffer] = useState();
  const [sale, setSale] = useState([]);
  const [itemsincart, setItemsincart] = useState(0);
  
  const [loginUser, setLoginUser] = useState([]);

  //new states
const [user,setUser]=useState([])
const [login, setLoging] = useState(false)
const [product, setProduct] = useState(Product);
const [cart, setCart] = useState([]);
const [search, setSearch] = useState("");
const [buy,setBuy]=useState([])

console.log(process.env.REACT_APP_API_URL,'env');
  return (
    <div className="App">
      <AllContext.Provider
        value={{
          userData,
          setUserData,
          totalPrice,
          setTotalPrice,
          sale,
          setSale,
          itemsincart,
          setItemsincart,
          loginUser,
          setLoginUser,
          offer,
          setOffer,
          //new values
          user,
          setUser,
          login,
          setLoging,
          product,
          setProduct,
          cart,
          setCart,
          search,
          setSearch,
          buy,setBuy

        }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Loging />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/Dog" element={<Dog />} />
          <Route path="/Cat" element={<Cat />} />
          <Route path="/View/:Id" element={<ViewProduct />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/addminhome" element={<AdminHome />} />
          <Route path="/Edit" element={<Edit />} />
          <Route path="/users" element={<Users />} />
          <Route path="/addminprodut" element={<AdminProduct />} />
          <Route path="/adminOders" element={<AdminOders />} />
          <Route path="/ProductEdit/:Id" element={<ProductEdit />} />
          <Route path="/adminLoging" element={<AdminLging />} />
          <Route path="/users/:Id" element={<UsersOders />} />
          <Route path="/users/payment/success" element={<PaymentSuccess/>} />
          <Route path="/users/payment/cancel" element={<PaymentCancel/>} />
        
          <Route />
        </Routes>
      </AllContext.Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
