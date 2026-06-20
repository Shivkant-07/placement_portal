import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student"
    },

    dsaProgress: {
        type: Number,
        default: 0
    },

    aptitudeProgress: {
        type: Number,
        default: 0
    },

    resume: {
        type: String,
        default: ""
    },
    phone: {

        type: String,

        default: ""
    },

    branch: {

        type: String,

        default: ""
    },

    cgpa: {

        type: String,

        default: ""
    },

    skills: {

        type: String,

        default: ""
    }

}, {
    timestamps: true
})

const UserModel = mongoose.model("User", userSchema)

export default UserModel