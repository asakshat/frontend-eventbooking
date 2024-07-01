import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/HomePage";
import Error404 from "./components/Error404";
import AuthForm from "./pages/AuthForm";
import EventPage from "./components/EventPage";
import AboutUs from "./components/AboutUs";
import JoinUs from "./components/JoinUs";
import Footer from "./components/Footer";
import CreateEvent from "./components/CreateEvent";
import DisplayAllEvents from "./components/DisplayAllEvents";
import EditEvent from "./components/EditEvent";
import VerifiedPage from "./pages/VerifiedPage";
import { Toaster } from "sonner";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        theme="system"
        richColors={true}
        visibleToasts={1}
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/*" element={<Error404 />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/join" element={<JoinUs />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events" element={<DisplayAllEvents />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/verify-email" element={<VerifiedPage />} />
          <Route path="/user/forgot-password" element={<ResetPassword />} />
          <Route path="/user/reset-password" element={<ForgotPassword />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
