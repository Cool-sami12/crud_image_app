exports.persistImage = (req, res) => {
    //collected image from a user
    const data = {
        title: req.body.title,
        image: req.body.image,
    }

    //upload image here 
    cloudinary.uploader.upload(data.image)
        .then((image) => {
            db.pool.connect((err, client) => {
                // insert query to run if the upload to cloudinary is successful is 
                const insertQuery = `INSERT INTO  images (title, cloudinary_id, image_url)
            VALUES($1,$2,$3) RETURNING *`;
                const values = [data.title, image.public_id, image.secure_url]

                //execute query 
                client.query(insertQuery, values)
                    .then((result) => {
                        result = result.rows[0];
                        //send success response
                        res.status(201).send({
                            status: "success",
                            data: {
                                message: "Image Uploaded Successfully,",
                                title: result.title,
                                cloudinary_id: result.cloudinary_id,
                                image_url: result.image_url,
                            },
                        })
                    }).catch((e) => {
                        response.status(500).send({
                            message: "failure",
                            e,
                        });
                    })
            })
        }).catch((error) => {
            res.status(500).send({
                message: "fail to upload",
                error,
            });
        });
}