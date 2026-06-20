import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/profile", { credentials: "include" });
      const data = await response.json();
      if (data.success) setUser(data.user);
    } catch (error) { console.log(error); }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", { credentials: "include" });
      const data = await response.json();
      alert(data.message);
      if (data.success) navigate("/");
    } catch (error) { console.log(error); }
  };

  return (
    // 'sticky top-0 z-50' se navbar screen ke top par lock ho jayega
    <nav className="sticky top-0 z-50 bg-[#0f172a] text-white shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <span className="text-blue-400">🚀</span> Placement Portal
        </h1>

        {/* Links */}
        <div className="flex items-center gap-8 font-medium text-gray-300">
          <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
          
          {user?.role === "admin" && (
            <>
              <Link to="/admin" className="hover:text-white transition">Admin Panel</Link>
              <Link to="/add-company" className="hover:text-white transition">Add Company</Link>
            </>
          )}
          
          <Link to="/applications" className="hover:text-white transition">My Applications</Link>
          <Link to="/profile" className="hover:text-white transition">Profile</Link>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;