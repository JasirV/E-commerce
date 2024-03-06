const fs=require('fs');
const path=require('path')
const multer=require('multer')
const store=multer.diskStorage({
    destination:path.join(__dirname,'upload'),
    filename:(req,res,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})
const upload=multer({store});
const cloudinary=require('cloudinary').v2
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadImage=(req,res,next)=>{
    upload.single('image')(req,res,async(err)=>{
        if(err){
            return res.status(400).json({
                message:err.message
            })

        }try{
            const result=await cloudinary.uploader.upload(req.file.path,{folder:'Product-img'})
            req.body.image=result.secure_url

            fs.unlink(req,file.path,(unlinker)=>{
                if(unlinker){
                    console.log('Error deleting Localfiles',unlinker);
                }
            })
            next()
        }
        catch(error){
            return res.status(500).json({message:'Error Uploading File To Cloudinary'})

        }
        }
    )
}

module.exports=uploadImage