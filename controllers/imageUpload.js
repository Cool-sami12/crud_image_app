const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

exports.imageUpload = (req, res) => {

    //collected image from a user
    const data = {
        image: req.body.image
    }

    //upload image here
    cloudinary.uploader.upload(data.image)
        .then((result) => {
            res.status(200).send({
                message: "success",
                result,
            });
        }).catch((error) => {
            res.status(500).send({
                message: "failure",
                error,
            });
        });
}