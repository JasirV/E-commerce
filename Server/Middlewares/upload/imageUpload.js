const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({
  destination: path.join(__dirname, "Ecommerce-imgs"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadImage = (req, res, next) => {
  console.log(process.env.CLOUD_NAME, 'aaaa');
  console.log("multersss");
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    try {
        console.log(req.file,'12578')
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Ecommerce-imgs"
      });

      if (!result || !result.secure_url) {
        throw new Error("Upload to Cloudinary failed");
      }

      console.log(result, '1234567');
      req.body.image = result.secure_url;

      fs.unlink(req.file.path, (unlinker) => {
        if (unlinker) {
          console.log("Error deleting local files", unlinker);
        }
      });
      next();
    } catch (error) {
      console.error("Error uploading file to Cloudinary:", error);
      return res.status(500).json({ message: "Error uploading file to Cloudinary" });
    }
  });
};

module.exports = uploadImage;
