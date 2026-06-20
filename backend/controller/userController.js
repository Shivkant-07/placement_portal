import UserModel from "../model/UserModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const signup = async (req, res) => {
    try {

        const { name, email, password } = req.body

        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            return res.send({
                message: "Email already exists",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })

        res.send({
            message: "User registered successfully",
            success: true,
            user
        })

    }
    catch (error) {

        res.send({
            message: "Signup failed",
            success: false,
            error
        })
    }
}
export const login = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.send({
                message: "User not found",
                success: false
            })
        }

        const matchPassword = await bcrypt.compare(
            password,
            user.password
        )

        if (!matchPassword) {
            return res.send({
                message: "Invalid password",
                success: false
            })
        }
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.send({
            message: "Login successful",
            success: true,
            user
        })

    }
    catch (error) {

        res.send({
            message: "Login failed",
            success: false,
            error
        })
    }
}

export const getProfile = async (req, res) => {

    try {

        const user = await UserModel.findById(
            req.user.userId
        ).select("-password")

        res.send({
            success: true,
            user
        })

    } catch (error) {

        console.log(error)

        res.send({
            success: false,
            message: "Failed to get profile"
        })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token')
        res.send({
            message: "Logout successful",
            success: true
        })

    } catch (error) {
        console.log(error);

        res.send({
            message: "Logout Failed",
            success: false
        })

    }
}


export const updateProfile =
    async (req, res) => {

        try {

            const userId =
                req.user.userId
            const {

                phone,

                branch,

                cgpa,

                skills

            } = req.body

            const updatedUser =
                await UserModel
                    .findByIdAndUpdate(

                        userId,

                        {
                            phone,
                            branch,
                            cgpa,
                            skills
                        },

                        {
                            returnDocument:
                                "after"
                        }
                    )

            res.send({

                success: true,

                message:
                    "Profile Updated",

                user:
                    updatedUser
            })

        } catch (error) {

            console.log(error)

            res.send({

                success: false,

                message:
                    "Failed To Update Profile"
            })
        }
    }

    export const uploadResume =
async (req, res) => {

    try {

        const userId =
            req.user.userId

        if (!req.file) {

            return res.send({

                success: false,

                message:
                "Please Upload Resume"
            })
        }

        const updatedUser =
            await UserModel
                .findByIdAndUpdate(

                    userId,

                    {
                        resume:
                        req.file.path
                    },

                    {
                        returnDocument:
                        "after"
                    }
                )

        res.send({

            success: true,

            message:
            "Resume Uploaded",

            user:
            updatedUser
        })

    } catch (error) {

        console.log(error)

        res.send({

            success: false,

            message:
            "Failed To Upload Resume"
        })
    }
}