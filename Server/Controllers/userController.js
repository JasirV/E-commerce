const userSchema = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const tokengenerator = require("../utils/jsWebToken");
const productSchema = require("../Models/productSchema");
const { default: mongoose } = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderSchema = require("../Models/oderSchema");
const Order = mongoose.model('Order', orderSchema);
//Register User
const createUser = async (req, res) => {
  const { name, email, username, password } = req.body;

  const user = await userSchema.findOne({ username: username });
  if (user) {
    return res.status(400).json({
      message: "User allrady exist",
    });
  }
  const newUSer = await userSchema.create({
    name: name,
    email: email,
    username: username,
    password: password,
  });
  res.status(201).json({
    status: "succes",
    data: {
      newUSer,
    },
  });
};

//LoginUser

const logingUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userSchema.findOne({ username }).select(`+password`);
  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Invalied input",
    });
  }
  if (!password || !user.password) {
    return res.status(400).json({
      status: "fail",
      message: "Invalit Input ",
    });
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return res.status(401).json({
      status: "fail",
      message: "Authentication Failed",
    });
  }
  const token = tokengenerator(user._id);

  res.status(200).json({
    status: "succes",
    message: "Authentication succesful",
    token,
    data: {
      user,
    },
  });
};

//View Product

const viewProduct = async (req, res) => {
  const product = await productSchema.find();
  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product Not Found",
    });
  }
  res.status(200).json({
    status: "succes",
    message: "succesfully fecth datas",
    product: product,
  });
};

//find the Product

const productById = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(400).json({
      status: "fail",
      message: "Invalied Product Id",
    });
  }
  const product = await productSchema.findById(productId);
  if (!product) {
    res.status(404).json({
      status: "fail",
      message: "Product Not Found",
    });
  }
  res.status(200).json({
    status: "succes",
    message: "succesfuly  fetched  data",
    product: product,
  });
};
//productCategory

const productList = async (req, res) => {
  const Paramscategory = req.params.categoryname;
  const category = await productSchema.find({category: Paramscategory }).exec();
  if (!category) {
    return res.status(400).json({
      status: "fail",
      message: "Product Not Found !",
    });
  }
  res.status(200).json({
    status: "succes",
    message: "Successfully fetch Data",
    product: category,
  });
};

// CART

const addToCart = async (req, res) => {
  const userId=req.params.id
  if(!mongoose.Types.ObjectId.isValid(userId)){
     return res.status(400).json({
          status:'fail',
          message:'invalid user ID format'
      })
  }
  const {productId}=req.body;
  if(!productId){
     return res.status(404).json({
          status:'fail',
          message:'product not found'
      })
  }
  const user = await userSchema.findById(userId);

  if (!user) {
      return res.status(404).json({
          status: 'fail',
          message: 'User not found'
      });
  }
  const isProductInCart = user.cart.some(item => item.productId.equals(productId));
  if (isProductInCart) {
      return res.status(409).json({
          status: 'fail',
          message: 'Product already exists in the cart'
      });
  }
 await userSchema.updateOne({_id:userId},{ $addToSet: { cart: { productId: productId}}})
  res.status(200).json({
      status:'success',
      message:'successfully product added to cart'
  })
}

//CartProduct

const cartProduct = async (req, res) => {
  const userId=req.params.id;
    if(!userId){
        return res.status(400).json({
             status:'fail',
             message:'invalid user ID format'
         })
     }
    const user=await userSchema.findById(userId).populate({path:'cart.productId',model:'product'})
    if(!user){
        return res.status(404).json({
            status:'fail',
            message:'user not found'
        })
    }
    const cartUserIds=user.cart
    if(cartUserIds.length===0){
        return res.status(200).json({
            status:'success',
            message:'user cart is empty',data:[]
        })
    }
    const cartProducts= user.cart
        res.status(200).json({
            status:'success',
            message:'successfull fetched cart products',
            data:cartProducts,
          
        })
  }
const updateCartItemQuantity =async(req,res)=>{
  const userId=req.params.id;
  const {id,quantity}=req.body;
  const user=await userSchema.findById(userId);
  if(!user){
    return res.status(404).json({
      message:'User not Found'
    })
  }
  const cartItem=user.cart.id(id);
  if(!cartItem){
    return res.status(404).json({
      message:'Cart Item Not Found'
    })
  }
  cartItem.quantity+=quantity;
  if(cartItem.quantity>0){
    await user.save();
  }
  res.status(200).json({
    status:"success",
    message:'Cart Item Qyantity Updated',
    data:user.cart
  })
}

const deleteProduct=async (req,res)=>{
  const userId=req.params.id;
const {id}=req.body;
if(!id){
  return res.status(400).json({
    status:'fail',
    message:'Invaild ID'
  })
}
const user =await userSchema.findById(userId)
if(!user){
  return res.status(404).json({
    status:'fail',
    message:'User Not Found!'
  })
}
await userSchema.updateOne({_id:userId},{$pull:{cart:{productId:id}}});
res.status(200).json({
  status:"success",
  message:'Product Deleted',
})
}

//add to wishlist

const addToWishList = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).json({
      status: "fail",
      message: "User Not Found",
    });
  }
  const { productId } = req.body;
  const products = await productSchema.findById(productId);
  if (!products) {
    return res.status(404).json({
      status: "fail",
      message: "Product not Found",
    });
  }
  const findProduct = await userSchema.findOne({
    _id: userId,
    wishlist: productId,
  });

  if (findProduct) {
    return res.status(409).json({
      status: "fail",
      message: "Product all redey exist",
    });
  }

  await userSchema.updateOne(
    { _id: userId },
    { $push: { wishlist: productId } }
  );
  res.status(200).json({
    status: "succes",
    message: "Product successfuly add to wishlist",
  });
};

//Wish List

const wishList = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      status: "fail",
      message: "Invalied User ID ",
    });
  }
  const user = await userSchema.findById(userId);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User Not Found",
    });
  }
  const wishlistId = user.wishlist;
  if (wishlistId.length === 0) {
    return res.status(200).json({
      status: "success",
      message: "user Wish Lists is empty",
      data: [],
    });
  }
  const wishListProduct = await productSchema.find({
    _id: wishlistId,
  });

  res.status(200).json({
    status: "success",
    message: "sduccessfuly fetch user wish list",
    data: wishListProduct,
  });
};

const deleteWishList = async (req, res) => {
  const userId = req.params.id;
  const { productId } = req.body;
  if (!productId) {
    return res.status(404).json({
      status: "fail",
      message: "product not found",
    });
  }
  const user = await userSchema.findById(userId);
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User Not Found",
    });
  }
  await userSchema.updateOne(
    { _id: userId },
    { $pull: { wishlist: productId } }
  );
  res.status(200).json({
    status: "success",
    message: "Removed product",
  });
};

// Paymet Section

let sValue = {};

const PaymetSection = async (req, res) => {
  const userid = req.params.id;
  const user = await userSchema
    .findOne({ _id: userid })
    .populate("cart.productId")
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User Not  Found",
    });
  }
  const cartProduct = user.cart;

  if (cartProduct.length === 0) {
    res.status(200).json({
      status: "success",
      message: "cart is empty",
      data:[]
    });
  }
  const items = cartProduct.map((i) => {
    return {
      price_data: {
        currency: "inr",
        product_data: { 
          images:[i.productId.image],
          name:i.productId.title,
        },
        unit_amount: Math.round(i.productId.price * 100),
      },
      quantity: i.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: `http://localhost:3000/users/payment/success`,
    cancel_url: "http://localhost:3000/users/payment/cancel",
  });
  if (!session) {
    return res.status(400).json({
      status: "fail",
      message: "error on session side",
    });
  }
  sValue = {
    userid,
    user,
    session,
  };
  res.status(200).json({
    status: "success",
    message: "Stripe payment session created",
    url: session.url,
  });
};

const succesPayment = async (req, res) => {
  const { userid, user, session } = sValue;
  const userId = userid
  const cartItem = user.cart;
  console.log(cartItem,"hai");
  const order = await Order.create({
    userId: userid,
    products: cartItem.map((value) => {value.productId,value.quantity}),
    order_id: session.id,
    payment_id: `demo ${Date.now()}`,
    total_amount: session.amount_total / 100,
  });
  console.log(order);
  if (!order) {
    return res.json({
      message: "errror",
    });
  }
  const orderId = order.id;
  const userUpdate = await userSchema.updateOne(
    { _id: userId },
    { $push: { orders: orderId }, $set: { cart: [] } },
    { new: true }
  );

  if (userUpdate) {
    res.status(200).json({
      status: "success",
      message: "Payment SuccessFul",
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Failed to Update user data",
    });
  }
};

// Order Details

const Orders = async (req, res) => {
  const userId = req.params.id;
  const user = await userSchema.findById(userId).populate("orders").exec();

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "user Not Found",
    });
  }
  const orderProducts = user.orders;
  if (orderProducts.length === 0) {
   return res.status(200).json({
      message: "You Not Orders ",
      data: [],
    });
  }
  const orderedProduct = await Order.find({ _id: { $in: orderProducts } }).populate("products").exec();
  res.status(200).json({
    message: "Ordered Products Details ",
    data: orderedProduct,
  });
};

module.exports = {
  createUser,
  logingUser,
  viewProduct,
  productById,
  productList,
  addToCart,
  cartProduct,
  addToWishList,
  wishList,
  deleteWishList,
  PaymetSection,
  succesPayment,
  Orders,
  deleteProduct,updateCartItemQuantity
};