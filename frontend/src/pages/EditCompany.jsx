
import {
    useEffect,
    useState
}
from "react"

import {
    useNavigate,
    useParams
}
from "react-router-dom"

import Navbar
from "../components/Navbar"
const BASE_URL = 'https://placement-portal-humi.onrender.com'

function EditCompany() {

    const { id } =
        useParams()

    const navigate =
        useNavigate()

    const [formData,
        setFormData] =
        useState({

            companyName: "",
            role: "",
            package: "",
            eligibility: "",
            location: "",
            deadline: ""
        })

    useEffect(() => {

        getCompany()

    }, [])

    const getCompany =
        async () => {

            try {

                const response =
                    await fetch(
                        `${BASE_URL}/companies`,
                        {
                            credentials:
                                "include"
                        }
                    )

                const data =
                    await response.json()

                if (data.success) {

                    const company =
                        data.companies
                            .find(

                                (item) =>

                                    String(
                                        item._id
                                    )

                                    ===

                                    String(
                                        id
                                    )
                            )

                    if (company) {

                        setFormData({

                            companyName:
                                company.companyName
                                || "",

                            role:
                                company.role
                                || "",

                            package:
                                company.package
                                || "",

                            eligibility:
                                company.eligibility
                                || "",

                            location:
                                company.location
                                || "",

                            deadline:
                                company.deadline

                                    ?

                                    new Date(
                                        company.deadline
                                    )

                                    .toISOString()

                                    .split("T")[0]

                                    :

                                    ""
                        })
                    }
                }

            } catch (error) {

                console.log(error)
            }
        }

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value
            })
        }

    const handleSubmit =
        async (e) => {

            e.preventDefault()

            try {

                const response =
                    await fetch(
                        `http://localhost:5000/update-company/${id}`,
                        {
                            method:
                                "PUT",

                            headers: {

                                "Content-Type":
                                    "application/json"
                            },

                            credentials:
                                "include",

                            body:
                                JSON.stringify(
                                    formData
                                )
                        }
                    )

                const data =
                    await response.json()

                alert(
                    data.message
                )

                if (data.success) {

                    alert(
                              "Company Updated Successfully" )

                    navigate(
                        "/admin"
                    )
                }

            } catch (error) {

                console.log(error)
            }
        }

    return (
        <>

            <Navbar />

            <div
                className="
                min-h-screen
                flex
                justify-center
                items-center
                bg-gray-100
                "
            >

                <form

                    onSubmit={
                        handleSubmit
                    }

                    className="
                    bg-white
                    p-8
                    rounded-lg
                    shadow-lg
                    w-[400px]
                    "
                >

                    <h1
                        className="
                        text-3xl
                        font-bold
                        mb-5
                        text-center
                        "
                    >
                        Edit Company
                    </h1>

                    <input
                        type="text"
                        name="companyName"
                        placeholder=
                        "Company Name"

                        value={
                            formData
                            .companyName
                        }

                        onChange={
                            handleChange
                        }

                        className="
                        w-full
                        border
                        p-3
                        mb-3
                        rounded-lg
                        "
                    />

                    <input
                        type="text"
                        name="role"
                        placeholder=
                        "Role"

                        value={
                            formData
                            .role
                        }

                        onChange={
                            handleChange
                        }

                        className="
                        w-full
                        border
                        p-3
                        mb-3
                        rounded-lg
                        "
                    />

                    <input
                        type="text"
                        name="package"
                        placeholder=
                        "Package"

                        value={
                            formData
                            .package
                        }

                        onChange={
                            handleChange
                        }

                        className="
                        w-full
                        border
                        p-3
                        mb-3
                        rounded-lg
                        "
                    />

                    <input
                        type="text"
                        name="eligibility"
                        placeholder=
                        "Eligibility"

                        value={
                            formData
                            .eligibility
                        }

                        onChange={
                            handleChange
                        }

                        className="
                        w-full
                        border
                        p-3
                        mb-3
                        rounded-lg
                        "
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder=
                        "Location"

                        value={
                            formData
                            .location
                        }

                        onChange={
                            handleChange
                        }

                        className="
                        w-full
                        border
                        p-3
                        mb-3
                        rounded-lg
                        "
                    />

                    <input
                        type="date"
                        name="deadline"

                        value={
                            formData
                            .deadline
                        }

                        onChange={
                            handleChange
                        }

                        className="
                        w-full
                        border
                        p-3
                        mb-4
                        rounded-lg
                        "
                    />

                    <button
                        className="
                        w-full
                        bg-green-600
                        text-white
                        py-3
                        rounded-lg
                        "
                    >
                        Update Company
                    </button>

                </form>

            </div>
        </>
    )
}

export default EditCompany

