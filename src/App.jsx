import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/HomePage";
import Error404 from "./components/Error404";
import AuthForm from "./pages/AuthForm";

// import EventPage from "./components/EventPage";
// import AboutUs from "./components/AboutUs";
// import JoinUs from "./components/JoinUs";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/error" element={<Error404 />} />

          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<AuthForm />} />
          {/* <Route path="/events" element={<EventPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/joinus" element={<JoinUs />} /> */}
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
