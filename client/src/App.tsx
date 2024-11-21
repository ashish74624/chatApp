import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Home from "./pages/Home"
import AuthPage from "./pages/AuthPage"
import Register from "./components/RegisterForm/Register"
import Login from "./components/LoginForm/Login"
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage Form={<Login />} />} />
        <Route path="/register" element={<AuthPage Form={<Register />} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
