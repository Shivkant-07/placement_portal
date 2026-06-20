import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
const BASE_URL = 'https://placement-portal-humi.onrender.com'
function AdminProtected({ children }) {

    const [loading, setLoading] =
        useState(true)

    const [isAdmin,
        setIsAdmin] =
        useState(false)

    useEffect(() => {

        checkAdmin()

    }, [])

    const checkAdmin =
        async () => {

            try {

                const response =
                    await fetch(
                        `${BASE_URL}/profile`,
                        {
                            credentials:
                                "include"
                        }
                    )

                const data =
                    await response.json()

                if (
                    data.success
                    &&
                    data.user.role
                    ===
                    "admin"
                ) {

                    setIsAdmin(true)
                }

            } catch (error) {

                console.log(error)
            }

            setLoading(false)
        }

    if (loading) {

        return <h1>Loading...</h1>
    }

    if (!isAdmin) {

        return (
            <Navigate
                to="/dashboard"
            />
        )
    }

    return children
}

export default AdminProtected

