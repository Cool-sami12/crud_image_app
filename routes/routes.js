const express = require('express');

const router = express.Router();

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const db = require("../services/dbConnect.js");

const imageUpload = require("../controllers/imageUpload");
const deleteImage = require("../controllers/deleteImage");
const persistImage = require("../controllers/persistImage");
const retrieveImage = require("../controllers/retrieveImage");
const updateImage = require("../controllers/updateImage");


//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

router.get("/", (req, res) => {
    res.json({ message: 'Hey this is your server response!!!' });

});


// image upload API
router.post("/upload-image", imageUpload.imageUpload);

// persist image 
router.post("/persist-image", persistImage.persistImage);

router.get("/retrieve-image/:cloudinary_id", retrieveImage.retrieveImage);

//delete image 
router.delete("/delete-image/:cloudinary_id", deleteImage.deleteImage);


//update image
router.put("/update-image/:cloudinary_id", updateImage.updateImage);



module.exports = router;