import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {

    try {

        const token = req.cookies.token

        if (!token) {
            return res.send({
                message: "Unauthorized user",
                success: false
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decoded

        next()

    } catch (error) {

        res.send({
            message: "Invalid token",
            success: false
        })
    }
}

export default authMiddleware