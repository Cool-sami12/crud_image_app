exports.updateImage = (req, res) => {
    //Unique id 
    const { cloudinary_id } = req.params;

    //collected image from a user
    const data = {
        title: req.body.title,
        image: req.body.image,
    };

    //delete image from cloudinary first 
    cloudinary.uploader
        .destroy(cloudinary_id)

        //upload image here 
        .then(() => {
            cloudinary.uploader
                .upload(data.image)

                //uodate the database here 
                .then((result) => {
                    db.pool.connect((err, client) => {
                        //update query 
                        const updateQuery = "UPDATE images SET title = $1, cloudinary_id =$2, image_url = $3 WHERE cloudinary_id = $4";
                        const value = [
                            data.title,
                            result.public_id,
                            result.secure_url,
                            cloudinary_id,
                        ];

                        //execute query
                        client
                            .query(updateQuery, value)
                            .then(() => {

                                // send success response
                                res.status(201).send({
                                    status: "success",
                                    data: {
                                        message: "Image Updated Successfully"
                                    },
                                });
                            })
                            .catch((e) => {
                                res.status(500).send({
                                    message: "Update Failed",
                                    e,

                                });
                            });
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "failed",
                        err,
                    });
                });
        })
        .catch((error) => {
            res.status(500).send({
                message: "failed",
                error,
            });
        });
}