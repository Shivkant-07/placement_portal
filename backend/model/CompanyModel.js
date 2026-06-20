import mongoose from "mongoose"

const companySchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    package: {
        type: String,
        required: true
    },

    eligibility: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    deadline: {
        type: String,
        required: true
    }

}, { timestamps: true })

const CompanyModel =
    mongoose.model("Company", companySchema)

export default CompanyModel