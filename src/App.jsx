import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import WorkoutForm from "./components/WorkoutForm";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import axios from "axios";

function App() {
  const { user } = useAuthContext();
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
        <Toaster richColors />
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
