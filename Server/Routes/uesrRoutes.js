const express = require("express");
const userController = require("../Controllers/userController");
const userRouter = express.Router();
const verifyToken=require('../Middlewares/userAuth')
const tryCatch=require('../Middlewares/tryCatchMiddleware')

userRouter
  .post("/register",tryCatch( userController.createUser))
  .post("/login", tryCatch(userController.logingUser))
  .get("/products", tryCatch(userController.viewProduct))
  .get("/products/:id", tryCatch(userController.productById))
  .get('/products/category/:categoryname',(userController.productList))
  .use(verifyToken)
  .post("/:id/cart", tryCatch(userController.addToCart))
  .get("/:id/cart", tryCatch(userController.cartProduct))
  .put("/:id/cart",tryCatch(userController.updateCartItemQuantity))
  .delete('/:id/cart',tryCatch(userController.deleteProduct))
  .post("/:id/wishlist", tryCatch(userController.addToWishList))
  .get("/:id/wishlist", tryCatch(userController.wishList))
  .delete("/:id/wishlist", tryCatch(userController.deleteWishList))
  .post("/:id/payment", tryCatch(userController.PaymetSection))
  .get("/payment/success", tryCatch(userController.succesPayment))
  .get("/:id/orders", tryCatch(userController.Orders));
module.exports = userRouter;