import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = 'https://placement-portal-humi.onrender.com'

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      alert(data.message);
      if (data.success) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 w-full max-w-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Create Account</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Join us and start your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4 md:space-y-5">
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 ml-1">Full Name</label>
            <input type="text" name="name" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 ml-1">Email</label>
            <input type="email" name="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 ml-1">Password</label>
            <input type="password" name="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
          </div>
          
          <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition shadow-lg mt-2">
            Signup
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account? <Link to="/" className="text-blue-600 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;