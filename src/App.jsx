import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

import NavBar from "./components/NavBar/NavBar";

// Pages
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import MyFlights from "./pages/MyFlights";
import Facilities from "./pages/Facilities";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Guide from "./pages/Guide";

// Auth
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        {/* ================= AUTHENTICATED ================= */}
        {user && (
          <>
            <Route path="/flights" element={<Flights />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/profile" element={<Profile />} />

            {!user.is_admin && (
              <Route path="/my-flights" element={<MyFlights />} />
            )}

            {user.is_admin && (
              <Route path="/admin" element={<AdminDashboard />} />
            )}
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
