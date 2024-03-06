const tryCatch=(handler)=>{
    return async(req,res,next)=>{
        try {
            await handler(req,res,next)
        } catch (error) {
            console.log(error);
            res.status(500).send({status:'Failed',message:'error',error_message:error.message})            
        }
    }
}

module.exports=tryCatch