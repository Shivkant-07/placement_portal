import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
const BASE_URL = 'https://placement-portal-humi.onrender.com'
function AdminDashboard() {
  const [groupedData, setGroupedData] = useState({});
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state add kiya
  const navigate = useNavigate();

  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/all-applications`, { credentials: "include" });
      const data = await response.json();
      if (data.success) {
        const grouped = data.applications.reduce((acc, app) => {
          const name = app.companyId?.companyName || "Unknown";
          if (!acc[name]) acc[name] = { id: app.companyId?._id, apps: [] };
          acc[name].apps.push(app);
          return acc;
        }, {});
        setGroupedData(grouped);
      }
    } catch (error) { console.log(error); }
    setLoading(false);
  };

  const handleStatusChange = async (applicationId, status) => {
    try {
      await fetch(`http://localhost:5000/update-status/${applicationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      getApplications();
    } catch (error) { console.log(error); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap sach mein ye company delete karna chahte hain?")) return;
    try {
      const response = await fetch(`http://localhost:5000/delete-company/${id}`, { method: "DELETE", credentials: "include" });
      const data = await response.json();
      if (data.success) getApplications();
    } catch (error) { console.log(error); }
  };

  return (
   <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Recruitment Portal</h1>
        
        {loading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : Object.keys(groupedData).length === 0 ? (
          // Yahan dikhega message agar koi application nahi hai
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-600">Koi applications nahi mili!</h2>
            <p className="text-gray-400 mt-2">Abhi tak kisi bhi student ne apply nahi kiya hai.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.keys(groupedData).map((companyName) => (
              <div key={companyName} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
                  <button 
                    onClick={() => setExpandedCompany(expandedCompany === companyName ? null : companyName)}
                    className="text-xl font-bold text-blue-900 hover:text-blue-600 transition"
                  >
                    {companyName} 
                    <span className="text-sm text-gray-400 ml-2 font-normal">({groupedData[companyName].apps.length} Applications)</span>
                  </button>
                  <div className="flex gap-3">
                    <button onClick={() => navigate(`/edit-company/${groupedData[companyName].id}`)} className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200">Edit Info</button>
                    <button onClick={() => handleDelete(groupedData[companyName].id)} className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100">Delete</button>
                  </div>
                </div>

                {expandedCompany === companyName && (
                  <div className="p-6 bg-gray-50">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-gray-400 text-xs uppercase tracking-wider">
                          <th className="pb-4">Student</th>
                          <th className="pb-4">Role</th>
                          <th className="pb-4">Email</th>
                          <th className="pb-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {groupedData[companyName].apps.map((app) => (
                          <tr key={app._id} className="text-sm text-gray-700">
                            <td className="py-4 font-semibold">{app.studentId?.name}</td>
                            <td className="py-4">{app.companyId?.role || "N/A"}</td>
                            <td className="py-4">{app.studentId?.email}</td>
                            <td className="py-4">
                              <select 
                                value={app.status} 
                                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                className="bg-white border border-gray-200 rounded-lg px-3 py-1 cursor-pointer focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Selected">Selected</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
}

export default AdminDashboard;