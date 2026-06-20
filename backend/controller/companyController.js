import CompanyModel from "../model/CompanyModel.js"
import ApplicationModel from "../model/ApplicationModel.js"

export const addCompany = async (req, res) => {

    try {

        const {
            companyName,
            role,
            package: companyPackage,
            eligibility,
            location,
            deadline
        } = req.body

        const company =
            await CompanyModel.create({

                companyName,
                role,

                package: companyPackage,

                eligibility,
                location,
                deadline
            })

        res.send({
            success: true,
            message: "Company added successfully",
            company
        })

    } catch (error) {

        console.log(error)

        res.send({
            success: false,
            message: "Failed to add company"
        })
    }
}

export const getCompanies =
    async (req, res) => {

        try {

            const companies =
                await CompanyModel.find()

            res.send({
                success: true,
                companies
            })

        } catch (error) {

            console.log(error)

            res.send({
                success: false,
                message:
                    "Failed to fetch companies"
            })
        }
    }

export const applyCompany =
    async (req, res) => {

        try {

            const { companyId } =
                req.body

            const studentId =
                req.user.userId

            const alreadyApplied =
                await ApplicationModel.findOne({

                    studentId,
                    companyId
                })

            if (alreadyApplied) {

                return res.send({

                    success: false,

                    message:
                        "Already applied"
                })
            }

            await ApplicationModel.create({

                studentId,
                companyId
            })

            res.send({

                success: true,

                message:
                    "Applied successfully"
            })

        } catch (error) {

            console.log(error)

            res.send({

                success: false,

                message:
                    "Application failed"
            })
        }
    }

export const getApplication = async (req, res, next) => {
    try {

        const studentId = req.user.userId
        const application = await ApplicationModel.find({ studentId }).populate("companyId")
        res.send({
            success: true,
            application
        })

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "failed to fetch application"
        })

    }
}

export const getAllApplications =
async (req, res) => {

    try {

        const applications =
            await ApplicationModel
                .find()
                

                .populate(
                    "studentId",
                    "name email resume"
                )

                .populate(
                    "companyId",
                    "companyName role"
                )

        res.send({

            success: true,

            applications
        })

    } catch (error) {

        console.log(error)

        res.send({

            success: false,

            message:
                "Failed to fetch applications"
        })
    }
}


export const deleteCompany =
async (req, res) => {

    try {

        const { id } =
            req.params

        await CompanyModel
            .findByIdAndDelete(id)
            await ApplicationModel.deleteMany({
                        companyId: id
          })

        res.send({

            success: true,

            message:
                "Company deleted successfully"
        })

    } catch (error) {

        console.log(error)

        res.send({

            success: false,

            message:
                "Failed to delete company"
        })
    }
}

export const updateCompany =
async (req, res) => {

    try {

        const { id } =
            req.params

        const updatedData =
            req.body

        const updatedCompany =
            await CompanyModel
                .findByIdAndUpdate(

                    id,

                    updatedData,

                    {
                        new: true
                    }
                )

        res.send({

            success: true,

            message:
                "Company updated successfully",

            updatedCompany
        })

    } catch (error) {

        console.log(error)

        res.send({

            success: false,

            message:
                "Failed to update company"
        })
    }
}


export const updateStatus =
async (req, res) => {

    try {

        const { id } =
            req.params

        const { status } =
            req.body

        await ApplicationModel
            .findByIdAndUpdate(

                id,

                {
                    status
                }
            )

        res.send({

            success: true,

            message:
            "Status updated"
        })

    } catch (error) {

        console.log(error)

        res.send({

            success: false,

            message:
            "Failed to update status"
        })
    }
}


export const getDashboardStats =
async (req, res) => {

    try {

        const totalCompanies =
            await CompanyModel
                .countDocuments()

        const totalApplications =
            await ApplicationModel
                .countDocuments()

        const selectedStudents =
            await ApplicationModel
                .countDocuments({

                    status:
                        "Selected"
                })

        res.send({

            success: true,

            stats: {

                totalCompanies,

                totalApplications,

                selectedStudents
            }
        })

    } catch (error) {

        console.log(error)

        res.send({

            success: false,

            message:
                "Failed To Load Stats"
        })
    }
}