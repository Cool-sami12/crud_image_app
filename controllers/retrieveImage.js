exports.retrieveImage = (req, res) => {
    // data from user
    const { cloudinary_id } = req.params;

    db.pool.connect((err, client) => {
        // query to find image
        const query = "SELECT * FROM images WHERE cloudinary_id = $1";
        const value = [cloudinary_id];

        // execute query
        client
            .query(query, value)
            .then((output) => {
                res.status(200).send({
                    status: "success",
                    data: {
                        id: output.rows[0].cloudinary_id,
                        title: output.rows[0].title,
                        url: output.rows[0].image_url,
                    },
                });
            })
            .catch((error) => {
                res.status(401).send({
                    status: "failure",
                    data: {
                        message: "could not retrieve record!",
                        error,
                    },
                });
            });
    });

}