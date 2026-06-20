import express from "express"
import { addCompany,getCompanies,applyCompany, getApplication, 
getAllApplications, deleteCompany, updateCompany, updateStatus, getDashboardStats }from "../controller/companyController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"

const router = express.Router()

router.post( "/add-company", authMiddleware,  adminMiddleware, addCompany)
router.get("/companies",authMiddleware,getCompanies)
router.post( "/apply-company", authMiddleware, applyCompany)
router.get("/get-application",authMiddleware,getApplication)
router.get("/all-applications",authMiddleware,adminMiddleware,getAllApplications)
router.delete("/delete-company/:id",authMiddleware,adminMiddleware,deleteCompany)
router.put( "/update-company/:id", authMiddleware, adminMiddleware, updateCompany)
router.put( "/update-status/:id",  authMiddleware, adminMiddleware, updateStatus)
router.get( "/dashboard-stats", authMiddleware, adminMiddleware, getDashboardStats)
export default router