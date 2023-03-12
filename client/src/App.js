import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Nav from "./components/Nav";
import Login from "./pages/login_register/login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/login_register/register";
import UploadCSV from "./pages/UploadCSV";
import SideNav from "./components/SideNav";
import ForgotPassword from "./pages/admin/ForgotPassword";
import ResetPassword from "./pages/admin/ResetPassword";
import Account from "./pages/admin/Account";
import Addresses from "./pages/Addresses";
import Address from "./pages/Address";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <UserProvider>
      <div
        className={
          width < 768
            ? "bg-[#a6e5f0] dark:bg-[#0a788b] min-h-screen"
            : "flex w-screen bg-[#a6e5f0] dark:bg-[#0a788b] min-h-screen"
        }
      >
        <Router>
          <header>{width < 768 ? <Nav /> : <SideNav />}</header>
          <main className="w-full p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addresses/:_id" element={<Addresses />} />
              <Route path="/edit_address/:_id" element={<Address />} />
              <Route path="/account" element={<Account />} />
              <Route path="/upload_csv" element={<UploadCSV />} />
              <Route path="/forgot_pass" element={<ForgotPassword />} />
              <Route
                path="/resetpassword/:resetToken"
                element={<ResetPassword />}
              />
            </Routes>
          </main>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
