const mongoose =require('mongoose')


const productSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    image:String,
    category: {
        type: String,
        enum: ['cat', 'dog'] 
    }
})

module.exports=mongoose.model('product',productSchema)