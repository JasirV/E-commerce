const User = require("../Models/userSchema");
const mongoose = require("mongoose");
const Product = require("../Models/productSchema");
const productSchema = require("../Models/productSchema");
const jwt = require("jsonwebtoken");
const userSchema = require("../Models/userSchema");
const orderSchema = require("../Models/oderSchema");
const Order = mongoose.model('Order', orderSchema);

//ADMIN LOGING

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { username: username },
      process.env.ADMIN_SECRET_STR
    );
    res.status(200).json({
      status: "success",
      token: token,
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "this is no an admin",
    });
  }
};

// USERS FIND

const users = async (req, res) => {
  const findUsers = await userSchema.find();

  if (!findUsers) {
    return res.status(404).json({
      status: "Error",
      message: "Users Not Found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "successfuly fecth User Data",
    data: findUsers,
  });
};

//UserBYId

const userById = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(404).json({
      status: "Error",
      message: "Invalid User ID",
    });
  }
  const user = await userSchema.findById(userId);

  if (!user) {
    return res.status(404).json({
      status: "Error",
      message: "User Not Found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "successfuly fetch User Data",
    data: user,
  });
};

//create Products
const createProduct = async (req, res) => {
  const {title,description,price,image,category,stock}=req.body;
     console.log(req.body);
     const newProduct= await productSchema.create({
        title,description,price,image,category,stock  
     })
     res.status(201).json({
        status: 'success',
        message: 'Successfully created a product.',
        data:newProduct
        })
};

// show the products
const adminProduct = async (req, res) => {
  const products = await productSchema.find();
  if (!products) {
    return res.status(404).json({
      status: "fail",
      message: "Products Not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "successfuly fetch Products",
    data: products,
  });
};

//PRODUCT BY ID FOR ADDMIN

const productById = async (req, res) => {
  const productId  = req.params.id;
  if (!productId) {
    return res.status(400).json({
      status: "fail",
      message: "No Id",
    });
  }
  const product = await productSchema.findById(productId);
  if (!product) {
    return res.status(404).json({
      status: "faile",
      message: "Product Not Found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "successfuly fetch data",
    product: product,
  });
};

//UpdateProducts

const UpdateProducts = async (req, res) => {
  const { id, title, description, price, image, category } = req.body;
  if (!id) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid Product ID",
    });
  }
  const product = await productSchema.findById(id);

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product Not Found",
    });
  }
  const update = await productSchema.findByIdAndUpdate(
    { _id: id },
    { title, description, price, image, category },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "update product",
    product: update,
  });
};

//Delete product

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  const product = await productSchema.findByIdAndDelete(id);
  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Prodct Not found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Delete product",
  });
};

//Total Revenue

const totalRevenue = async (req, res) => {
  const total = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalProduct: { $sum: { $size: "$products" } },
        totalRevenue: { $sum: "$total_amount" },
      },
    },
  ]);
  if(!total){
    return res.status(400).json({
      message:'no Revenue'
    })
  }
  res.status(200).json({
    status:'success',
    message:'suucessfuly calculate the revenue',
    total
  })
};

//orders

const order = async (req, res) => {
  const product = await Order.find();
  // console.log(product);
  const user=await Order.find().populate({path:'products',model:'product'});
  console.log(user,"user");
  if (!product) {
    return res.status(200).json({
      message: "No Products",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Successfuly fetch Orders ",
    user
    
  });
};

module.exports = {
  createProduct,
  adminProduct,
  adminLogin,
  users,
  userById,
  productById,
  UpdateProducts,
  deleteProduct,
  totalRevenue,
  order,
};
