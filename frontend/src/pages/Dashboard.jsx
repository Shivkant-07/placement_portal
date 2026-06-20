import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
const BASE_URL = 'https://placement-portal-humi.onrender.com'

function Dashboard() {

    const [user, setUser] = useState(null)
    const [companies, setCompanies] = useState([])
    const [application, setApplications] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)


    const navigate = useNavigate()

    useEffect(() => {

        getProfile()
        getCompanies()
        getMyApplications()

    }, [])

    const getProfile = async () => {

        try {

            const response = await fetch(
                `${BASE_URL}/profile`,
                {
                    credentials: "include"
                }
            )

            const data = await response.json()

            if (data.success) {
                setUser(data.user)
            }

        } catch (error) {

            console.log(error)
        }
    }

    const getCompanies = async () => {

        try {
            setLoading(true)
            const response = await fetch(
                "http://localhost:5000/companies",
                {
                    credentials: "include"
                }
            )

            const data = await response.json()

            if (data.success) {

                setCompanies(
                    data.companies
                )
            }

        } catch (error) {

            console.log(error)
        }

        finally {

            setLoading(false)
        }
    }

    const handleLogout = async () => {

        try {

            const response = await fetch(
                "http://localhost:5000/logout",
                {
                    credentials: "include"
                }
            )

            const data = await response.json()

            alert(data.message)

            if (data.success) {
                navigate("/")
            }

        } catch (error) {

            console.log(error)
        }
    }

    const handleApply =
        async (companyId) => {

            try {

                const response =
                    await fetch(
                        "http://localhost:5000/apply-company",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            credentials:
                                "include",

                            body: JSON.stringify({

                                companyId
                            })
                        }
                    )

                const data =
                    await response.json()

                alert(data.message)
                getMyApplications()

            } catch (error) {

                console.log(error)
            }
        }

    const getMyApplications =
        async () => {

            try {

                const response =
                    await fetch(
                        "http://localhost:5000/get-application",
                        {
                            credentials:
                                "include"
                        }
                    )

                const data =
                    await response.json()

                if (data.success) {

                    setApplications(
                        data.application
                    )
                }

            } catch (error) {

                console.log(error)
            }
        }

    if (loading) {
        return (

            <div
                className="
            flex
            flex-col
            justify-center
            items-center
            h-screen
            "
            >

                <div
                    className="
                w-12
                h-12
                border-4
                border-blue-500
                border-t-transparent
                rounded-full
                animate-spin
                "
                >
                </div>

                <p
                    className="
                mt-4
                text-lg
                font-semibold
                "
                >
                    Loading...
                </p>

            </div>
        )
    }

    return (

        <div>

            <Navbar />

            <div className="p-8 bg-gray-100 min-h-screen">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-xl mb-8">
                    <h1 className="text-4xl font-bold">
                        Welcome, {user?.name} 👋
                    </h1>

                    <p className="mt-2 text-lg opacity-90">
                        Find and apply to the latest placement opportunities.
                    </p>
                </div>

                <div className="
max-w-7xl
mx-auto
">

                    <div className="
    text-center
    mb-8
    ">

                        <h1 className="
        text-4xl
        font-bold
        text-gray-800
        ">
                            🚀 Placement Drives
                        </h1>

                        <p className="
        text-gray-500
        mt-2
        ">
                            Explore active placement opportunities
                        </p>

                    </div>

                </div>
                <div className="mb-8 flex justify-center">

                    <input
                        type="text"
                        placeholder="🔍 Search Company..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="
        w-full
        md:w-[500px]
        border
        border-gray-300
        p-4
        rounded-xl
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        "
                    />

                </div>

                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                    {
                        companies

                            .filter((company) => {

                                const today =
                                    new Date()

                                const deadline =
                                    new Date(
                                        company.deadline
                                    )

                                return deadline >= today
                            })

                            .filter((company) =>

                                company.companyName

                                    .toLowerCase()

                                    .includes(

                                        search
                                            .toLowerCase()

                                    )
                            )

                            .map(
                                (company) => (

                                    <div key={company._id} className="
bg-white
rounded-2xl
shadow-md
p-6
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
border
border-gray-100
">
                                        <h2 className="
                                    text-3xl
                                    font-bold
                                    text-blue-600
                                    mb-3
                                    ">
                                            {
                                                company.companyName
                                            }
                                        </h2>

                                        <p>
                                            <strong>
                                                Role:
                                            </strong>

                                            {" "}
                                            {company.role}
                                        </p>

                                        <p>
                                            <strong>
                                                Package:
                                            </strong>

                                            {" "}
                                            {company.package}
                                        </p>

                                        <p>
                                            <strong>
                                                Eligibility:
                                            </strong>

                                            {" "}
                                            {
                                                company.eligibility
                                            }
                                        </p>

                                        <p>
                                            <strong>
                                                Location:
                                            </strong>

                                            {" "}
                                            {
                                                company.location
                                            }
                                        </p>

                                        <p>
                                            <strong>
                                                Deadline:
                                            </strong>

                                            {" "}
                                            {
                                                company.deadline
                                            }
                                        </p>
                                        <button
                                            disabled={application.some(
                                                (item) =>
                                                    item.companyId && item.companyId._id === company._id
                                            )}

                                            onClick={() =>
                                                handleApply(company._id)
                                            }

                                            className={`

    mt-6
    px-4
    py-2
    rounded-lg
    w-full
    text-white
   py-3
font-semibold
    ${application.some(
                                                (item) =>
                                                    item.companyId && item.companyId._id ===
                                                    company._id
                                            )

                                                    ? "bg-gray-500"

                                                    : "bg-blue-600 hover:bg-blue-700"
                                                }

    `}
                                        >

                                            {

                                                application.some(
                                                    (item) =>
                                                        item.companyId && item.companyId._id ===
                                                        company._id
                                                )

                                                    ?

                                                    "Already Applied"

                                                    :

                                                    "Apply Now"
                                            }

                                        </button>

                                    </div>
                                ))
                    }

                </div>
            </div>
            <Footer/>
        </div>


    )
}




export default Dashboard