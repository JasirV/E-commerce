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
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    console.log(req);
    try {
      // Check if req.file is present and not undefined
      if (!req.file) {
        throw new Error("No file uploaded");
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Ecommerce-imgs"
      });

      if (!result || !result.secure_url) {
        throw new Error("Upload to Cloudinary failed");
      }

      req.body.image = result.secure_url;

      // Delete the temporary file after uploading to Cloudinary
      fs.unlink(req.file.path, (unlinkerError) => {
        if (unlinkerError) {
          console.log("Error deleting local files", unlinkerError);
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
