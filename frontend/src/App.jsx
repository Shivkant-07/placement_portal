import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminDashboard from "./pages/AdminDashboard"
import AdminProtected from "./components/AdminProtected"
import AddCompany from "./pages/AddCompany"
import EditCompany from "./pages/EditCompany"
import MyApplications from "./pages/Application"

function App() {

  return (
    <>
    
    <Routes>

      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/admin" element={<AdminProtected><AdminDashboard/></AdminProtected>}></Route>

      <Route path="/add-company" element={<AddCompany />}/>

      <Route path="/edit-company/:id" element={<EditCompany />}/>
    
      <Route path="/profile" element={<Profile/>}/>

      <Route path="/applications" element={<MyApplications/>}/>
      
      

    </Routes>

    </>
  )
}

export default App