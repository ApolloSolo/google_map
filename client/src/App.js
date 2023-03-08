import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Nav from "./components/Nav";
import Login from "./pages/login_register/login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/login_register/register";
import UploadCSV from "./pages/UploadCSV";
import SideNav from "./components/SideNav";

function App() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <UserProvider>
      <div className={width < 768 ? "" : "flex w-full"}>
        <Router>
          <header>{width < 768 ? <Nav /> : <SideNav />}</header>
          <main>
            <h1>Home Page</h1>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload_csv" element={<UploadCSV />} />
            </Routes>
          </main>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
