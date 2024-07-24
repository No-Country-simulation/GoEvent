import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessHub, Home, Events } from "./pages";
import LandingPage from "./pages/LandingPage";
import ProtecteRoute from "./components/ProtecteRoute";
import EventDetailsPage from "./pages/EventDetailsPage";
import InvitationEditor from "./components/invitationTemplate/InvitationEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AccessHub />} />
        <Route path="/invitationEdit" element={<InvitationEditor/>} />
        <Route
          path="/home"
          element={<ProtecteRoute element={<Home />} redirectTo={"/login"} />}
        />
        <Route path="/eventos" element={<Events />} />
        <Route path="/evento/:eventId" element={<EventDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
