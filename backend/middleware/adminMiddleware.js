const adminMiddleware = (req, res, next) => {

    try {

        if (req.user.role !== "admin") {

            return res.send({
                success: false,
                message: "Access denied. Admin only"
            })
        }

        next()

    } catch (error) {

        res.send({
            success: false,
            message: "Authorization failed"
        })
    }
}

export default adminMiddleware