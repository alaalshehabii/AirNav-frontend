// src/App.jsx

import { Routes, Route } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';

import Flights from './pages/Flights';
import Facilities from './pages/Facilities';
import Profile from './pages/Profile';

import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Routes>
        {user ? (
          <>
            {/* Default page after login */}
            <Route path='/' element={<Flights />} />

            {/* Main pages */}
            <Route path='/flights' element={<Flights />} />
            <Route path='/facilities' element={<Facilities />} />
            <Route path='/profile' element={<Profile />} />
          </>
        ) : (
          <Route path='/' element={<Landing />} />
        )}

        {/* Auth routes */}
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
