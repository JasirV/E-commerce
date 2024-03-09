const jwt =require('jsonwebtoken')

module.exports= function verifyToken(req,res,next){
const head=req.headers["authorization"];
if(!head){
    return res.status(403).json({
        message:"no Token Provider"
    })
}
const token=head;

if(!token){
    return res.status(403).json({
        message:"Invalid Token"
    })
}
jwt.verify(token,process.env.ADMIN_SECRET_STR,(error,decode)=>{
    if(error){
        return res.status(401).json({
            message:'Unauthorizad'
        })
    }
    req.email=decode.email
    next()
})

}