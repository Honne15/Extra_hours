import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ExtraHour from "./pages/ExtraHour";
import ProbarConexion from "./pages/ProbarConexion";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/extrahours" element={<ExtraHour />} />
        <Route path="/probarconexion" element={<ProbarConexion />} />
      </Routes>
    </Router>
  )
}

export default App
