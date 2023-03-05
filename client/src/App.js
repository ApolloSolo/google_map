import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Nav from "./components/Nav";
import Login from "./pages/login_register/login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/login_register/register";
import UploadCSV from "./pages/UploadCSV";

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <header>
            <Nav />
          </header>
          <main>
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
