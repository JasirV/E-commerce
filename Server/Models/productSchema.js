const mongoose =require('mongoose')


const productSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    image:String,
    category: {
        type: String,
        enum: ['cat', 'dog'] 
    },
    qty:Number,
    stock:Number,
    oldPrice:Number
})

module.exports=mongoose.model('product',productSchema)