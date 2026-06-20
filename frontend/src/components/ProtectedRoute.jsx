import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
const BASE_URL = 'https://placement-portal-humi.onrender.com'

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] =
        useState(false)

    useEffect(() => {

        checkUser()

    }, [])

    const checkUser = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/profile`,
                {
                    credentials: "include"
                }
            )

            const data = await response.json()

            if (data.success) {
                setIsAuthenticated(true)
            }

        } catch (error) {

            console.log(error)
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