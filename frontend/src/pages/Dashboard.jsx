import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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

    // ... (baki functions wahi rahenge jo tumne bheje hain)
    const getProfile = async () => {
        try {
            const response = await fetch(`${BASE_URL}/profile`, { credentials: "include" })
            const data = await response.json()
            if (data.success) setUser(data.user)
        } catch (error) { console.log(error) }
    }

    const getCompanies = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${BASE_URL}/companies`, { credentials: "include" })
            const data = await response.json()
            if (data.success) setCompanies(data.companies)
        } catch (error) { console.log(error) }
        finally { setLoading(false) }
    }

    const handleApply = async (companyId) => {
        try {
            const response = await fetch(`${BASE_URL}/apply-company`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ companyId })
            })
            const data = await response.json()
            alert(data.message)
            getMyApplications()
        } catch (error) { console.log(error) }
    }

    const getMyApplications = async () => {
        try {
            const response = await fetch(`${BASE_URL}/get-application`, { credentials: "include" })
            const data = await response.json()
            if (data.success) setApplications(data.application)
        } catch (error) { console.log(error) }
    }

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>

    return (
        <div>
            <Navbar />
            <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 md:p-8 rounded-2xl shadow-xl mb-8">
                    <h1 className="text-2xl md:text-4xl font-bold">Welcome, {user?.name} 👋</h1>
                    <p className="mt-2 text-sm md:text-lg opacity-90">Find and apply to the latest placement opportunities.</p>
                </div>

                {/* Search Bar */}
                <div className="mb-8 flex justify-center">
                    <input
                        type="text"
                        placeholder="🔍 Search Company..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-[500px] border border-gray-300 p-3 md:p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies
                        .filter((company) => new Date(company.deadline) >= new Date())
                        .filter((company) => company.companyName.toLowerCase().includes(search.toLowerCase()))
                        .map((company) => (
                            <div key={company._id} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all">
                                <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3">{company.companyName}</h2>
                                <div className="space-y-2 text-sm md:text-base">
                                    <p><strong>Role:</strong> {company.role}</p>
                                    <p><strong>Package:</strong> {company.package}</p>
                                    <p><strong>Eligibility:</strong> {company.eligibility}</p>
                                    <p><strong>Location:</strong> {company.location}</p>
                                    <p><strong>Deadline:</strong> {company.deadline}</p>
                                </div>
                                <button
                                    disabled={application.some((item) => item.companyId && item.companyId._id === company._id)}
                                    onClick={() => handleApply(company._id)}
                                    className={`mt-6 px-4 py-3 rounded-lg w-full text-white font-semibold ${application.some((item) => item.companyId && item.companyId._id === company._id) ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
                                >
                                    {application.some((item) => item.companyId && item.companyId._id === company._id) ? "Already Applied" : "Apply Now"}
                                </button>
                            </div>
                        ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard;