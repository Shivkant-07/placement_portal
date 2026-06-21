import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = 'https://placement-portal-humi.onrender.com'

function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "", role: "", package: "", eligibility: "", location: "", deadline: ""
  });

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    try {
      const response = await fetch(`${BASE_URL}/companies`, { credentials: "include" });
      const data = await response.json();
      if (data.success) {
        const company = data.companies.find((item) => String(item._id) === String(id));
        if (company) {
          setFormData({
            companyName: company.companyName || "",
            role: company.role || "",
            package: company.package || "",
            eligibility: company.eligibility || "",
            location: company.location || "",
            deadline: company.deadline ? new Date(company.deadline).toISOString().split("T")[0] : ""
          });
        }
      }
    } catch (error) { console.log(error); }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/update-company/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
      if (data.success) navigate("/admin");
    } catch (error) { console.log(error); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-2xl mx-auto py-8 px-4 w-full">
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Edit Company</h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Update the details for this job opening.</p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Role</label>
                <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Package</label>
                <input type="text" name="package" value={formData.package} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Eligibility Criteria</label>
              <textarea name="eligibility" value={formData.eligibility} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 h-24" required />
            </div>

            <div className="space-y-1">
              <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Application Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 md:py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              Update Company Details
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default EditCompany;