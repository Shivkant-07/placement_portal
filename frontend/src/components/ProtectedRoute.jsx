import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
const BASE_URL = 'https://placement-portal-humi.onrender.com'

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async () => {
        try {
            console.log("Checking auth status with backend..."); // <-- Yahan check karein
            
            const response = await fetch(
                `${BASE_URL}/profile`,
                {
                    credentials: "include"
                }
            )

            const data = await response.json()
            console.log("Auth check response:", data); // <-- Yahan backend ka response dekhein

            if (data.success) {
                setIsAuthenticated(true)
            } else {
                console.log("Not authenticated, backend returned false");
            }

        } catch (error) {
            console.error("Auth check failed:", error); // <-- Error yahan dikhega
        }
        setLoading(false)
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return isAuthenticated
        ? children
        : <Navigate to="/" />
}

export default ProtectedRoute