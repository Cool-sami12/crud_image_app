exports.deleteImage = (req, res) => {
    // Unique_id 
    const { cloudinary_id } = req.params;

    //delete image from our cloudinary first 
    cloudinary.uploader
        .destroy(cloudinary_id)

        //delete image record from postgres also 
        .then(() => {

            db.pool.connect((err, client) => {

                //delete query
                const deleteQuery = "DELETE FROM images WHERE cloudinary_id = $1"
                const deleteValue = [cloudinary_id];

                //execute delete query
                client
                    .query(deleteQuery, deleteValue)
                    .then((deleteResult) => {
                        res.status(200).send({
                            message: "Image Deleted Successfully!!",
                            deleteResult,
                        });
                    })
                    .catch((e) => {
                        res.status(500).send({
                            message: "IMage Couldn't be Deleted!",
                            e,
                        });
                    });
            })
        })
        .catch((error) => {
            res.status(500).send({
                message: "Failure",
                error,
            });
        });

}