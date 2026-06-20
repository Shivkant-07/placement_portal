import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyApplications();
  }, []);

  const getMyApplications = async () => {
    try {
      const response = await fetch("http://localhost:5000/get-application", {
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setApplications(data.application);
      }
    } catch (error) {
      console.log("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function status colors ke liye
  // Is function ko apne MyApplications.jsx mein replace kar do
const getStatusStyles = (status) => {
  switch (status?.toLowerCase()) {
    case 'accepted':
    case 'selected':
      return "bg-green-100 border-green-200 text-green-700"; // Green for success
    case 'rejected':
      return "bg-red-100 border-red-200 text-red-700"; // Red for rejection
    case 'shortlisted':
      return "bg-white border-gray-200 text-gray-700 shadow-sm"; // White for shortlisted
    case 'pending':
      return "bg-amber-50 border-amber-200 text-amber-700"; // Amber for pending
    default:
      return "bg-gray-50 border-gray-200 text-gray-700"; // Default
  }
};
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
     <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900">My Applications</h1>
          <p className="text-gray-500 mt-2">Here is the list of all companies you have applied to.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700">No applications found</h3>
            <p className="text-gray-500 mt-2">Apply for your dream job to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((item) => (
              item.companyId && (
                <div 
                  key={item._id} 
                  className={`relative p-6 rounded-3xl border transition-all duration-300 hover:shadow-lg bg-white`}
                >
                  {/* Status Badge */}
                  <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusStyles(item.status)}`}>
                    {item.status}
                  </div>

                  {/* Company Info */}
                  <div className="mt-4">
                    <h2 className="text-2xl font-bold text-gray-900">{item.companyId.companyName}</h2>
                    <p className="text-gray-600 font-medium mt-1">{item.companyId.role}</p>
                  </div>

                  {/* Footer Info */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <span>Applied on</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
      </main>
       <Footer/>
    </div>
  );
}

export default MyApplications;