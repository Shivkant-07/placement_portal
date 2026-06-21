import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const BASE_URL = 'https://placement-portal-humi.onrender.com'

function Profile() {
  const [formData, setFormData] = useState({
    phone: "", branch: "", cgpa: "", skills: "", name: "", email: "",
  });
  const [resume, setResume] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/profile`, { credentials: "include" });
      const data = await response.json();
      if (data.success) {
        setFormData(data.user);
      }
    } catch (error) { console.log(error); }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-3xl mx-auto py-8 px-4 w-full">
        
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Personal Profile</h1>

          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden mb-4 relative">
              {preview ? <img src={preview} alt="Profile" className="w-full h-full object-cover" /> 
                      : <div className="flex items-center justify-center h-full text-gray-400 text-xs md:text-base">Upload</div>}
            </div>
            <label className="text-blue-600 font-semibold cursor-pointer hover:underline text-sm md:text-base">
              Change Photo
              <input type="file" className="hidden" onChange={(e) => setPreview(URL.createObjectURL(e.target.files[0]))} />
            </label>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Branch</label>
              <input name="branch" value={formData.branch} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">CGPA</label>
              <input name="cgpa" value={formData.cgpa} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Skills</label>
              <input name="skills" value={formData.skills} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="mt-6">
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Resume (PDF)</label>
            <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} className="w-full p-3 border border-dashed border-gray-300 rounded-xl text-sm" />
          </div>

          <button className="w-full mt-8 bg-gray-900 text-white py-3 md:py-4 rounded-xl font-bold hover:bg-gray-800 transition">
            Save Changes
          </button>
        </form>
      </main>
      <Footer/>
    </div>
  );
}

export default Profile;