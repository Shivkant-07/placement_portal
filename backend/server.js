import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRoutes from "./route/Userroute.js"
dotenv.config()
import authMiddleware from "./middleware/authMiddleware.js"
import adminMiddleware from "./middleware/adminMiddleware.js"
import companyRoute from "./route/companyRoute.js"

const app = express()

app.use("/upload", express.static( "upload" ))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(userRoutes)
app.use(companyRoute)

app.get("/", (req, res) => {
    res.send("Placement Portal Backend Running")
})

app.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    (req, res) => {

        res.send({
            success: true,
            message: "Welcome admin"
        })
    }
)


const PORT = process.env.PORT || 5000
connectDB()
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})