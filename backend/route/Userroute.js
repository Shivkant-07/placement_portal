import express from "express"
import { signup, login, getProfile, logout, updateProfile, uploadResume } from "../controller/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import upload from "../middleware/multer.js"
const router = express.Router()

router.post("/signup", signup)
router.post('/login', login)
router.get("/profile",authMiddleware,getProfile)
router.get("/logout",logout)
router.put("/update-profile", authMiddleware, updateProfile)
router.put( "/upload-resume", authMiddleware, upload.single("resume"), uploadResume)
export default router