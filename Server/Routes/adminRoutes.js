const express = require("express");
const adminRoutes = express.Router();
const adminController = require("../Controllers/adminController");
const tryCatch=require('../Middlewares/tryCatchMiddleware')
const adminauth=require('../Middlewares/adminAuth')
const uploadImage=require('../Middlewares/upload/imageUpload')
adminRoutes.post('/login',adminController.adminLogin)
.use(adminauth)
.post("/products", uploadImage,(adminController.createProduct))
.get('/products',tryCatch(adminController.adminProduct))
.get('/users',tryCatch(adminController.users))
.get('/:id/users',tryCatch(adminController.userById))
.get('/:id/products',tryCatch(adminController.productById))
.put('/products',tryCatch(adminController.UpdateProducts))
.delete('/products',tryCatch(adminController.deleteProduct))
.get('/Revenue',tryCatch(adminController.totalRevenue))
.get('/order',tryCatch(adminController.order))
module.exports = adminRoutes;
