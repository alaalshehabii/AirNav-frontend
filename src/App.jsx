
// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

import NavBar from "./components/NavBar/NavBar";

// Pages
import Home from "./pages/Home";          // 👈 NEW
import Landing from "./components/Landing/Landing";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Flights from "./pages/Flights";
import MyFlights from "./pages/MyFlights";
import Facilities from "./pages/Facilities";
import Profile from "./pages/Profile";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {/* ===== Public Routes ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        {/* ===== Protected Routes ===== */}
        {user ? (
          <>
            <Route path="/flights" element={<Flights />} />
            <Route path="/my-flights" element={<MyFlights />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          // If not logged in → force sign in
          <>
            <Route path="/flights" element={<Navigate to="/sign-in" />} />
            <Route path="/my-flights" element={<Navigate to="/sign-in" />} />
            <Route path="/facilities" element={<Navigate to="/sign-in" />} />
            <Route path="/profile" element={<Navigate to="/sign-in" />} />
          </>
        )}

        {/* ===== Fallback ===== */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;

