import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = 'https://placement-portal-humi.onrender.com'

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Mobile menu ke liye state
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/profile`, { credentials: "include" });
      const data = await response.json();
      if (data.success) setUser(data.user);
    } catch (error) { console.log(error); }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, { credentials: "include" });
      const data = await response.json();
      alert(data.message);
      if (data.success) navigate("/");
    } catch (error) { console.log(error); }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0f172a] text-white shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <span className="text-blue-400">🚀</span> Placement Portal
        </h1>

        {/* Hamburger Menu Icon (Sirf mobile par dikhega) */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Links Container */}
        <div className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-[#0f172a] md:bg-transparent p-6 md:p-0 gap-6 md:gap-8 font-medium text-gray-300 items-center border-t md:border-none border-gray-800`}>
          
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-white transition">Dashboard</Link>
          
          {user?.role === "admin" && (
            <>
              <Link to="/admin" onClick={() => setIsOpen(false)} className="hover:text-white transition">Admin Panel</Link>
              <Link to="/add-company" onClick={() => setIsOpen(false)} className="hover:text-white transition">Add Company</Link>
            </>
          )}
          
          <Link to="/applications" onClick={() => setIsOpen(false)} className="hover:text-white transition">My Applications</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)} className="hover:text-white transition">Profile</Link>

          {/* Logout Button */}
          <button 
            onClick={() => { handleLogout(); setIsOpen(false); }}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition font-semibold w-full md:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;