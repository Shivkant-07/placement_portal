import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const BASE_URL = 'https://placement-portal-humi.onrender.com'

function AddCompany() {
  const [formData, setFormData] = useState({
    companyName: "", role: "", package: "", eligibility: "", location: "", deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/add-company`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
      if (data.success) {
        setFormData({ companyName: "", role: "", package: "", eligibility: "", location: "", deadline: "" });
      }
    } catch (error) { console.log(error); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-2xl mx-auto py-8 px-4 w-full">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Add New Company</h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Enter company details to list a new job opening.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Company Name</label>
                <input type="text" name="companyName" placeholder="e.g. Google" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Role</label>
                <input type="text" name="role" placeholder="e.g. SDE" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Package</label>
                <input type="text" name="package" placeholder="e.g. 20 LPA" value={formData.package} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Location</label>
                <input type="text" name="location" placeholder="e.g. Bangalore" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Eligibility Criteria</label>
              <textarea name="eligibility" placeholder="Describe eligibility..." value={formData.eligibility} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 h-24" required />
            </div>

            <div className="space-y-1">
              <label className="text-xs md:text-sm font-semibold text-gray-700 ml-1">Application Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 md:py-4 rounded-xl hover:bg-gray-800 transition shadow-lg shadow-gray-200">
              Publish Job Opening
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AddCompany;