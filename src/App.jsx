import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import MyFlights from "./pages/MyFlights";
import Facilities from "./pages/Facilities";
import Profile from "./pages/Profile";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {/* Home ALWAYS visible */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        {/* Protected */}
        {user && (
          <>
            <Route path="/flights" element={<Flights />} />
            <Route path="/my-flights" element={<MyFlights />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;

