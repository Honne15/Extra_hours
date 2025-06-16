import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ExtraHour from "./pages/ExtraHour";
import Profile from "./pages/Profile";
import Record from "./pages/Record";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/extrahours" element={<ExtraHour />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/record" element={<Record />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
