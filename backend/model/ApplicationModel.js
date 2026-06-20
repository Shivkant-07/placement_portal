import mongoose from "mongoose"

const applicationSchema =
new mongoose.Schema({

    studentId: {

        type:
        mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true
    },

    companyId: {

        type:
        mongoose.Schema.Types.ObjectId,

        ref: "Company",

        required: true
    },
status: {

    type: String,

    default:
        "Pending"
}
},
{ timestamps: true })

const ApplicationModel =
mongoose.model(
    "Application",
    applicationSchema
)

export default ApplicationModel