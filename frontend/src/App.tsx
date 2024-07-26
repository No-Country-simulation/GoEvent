import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessHub, Home } from "./pages";
import LandingPage from "./pages/LandingPage";
import ProtecteRoute from "./components/ProtecteRoute";
import EventDetailsPage from "./pages/EventDetailsPage";
import InvitationEditPage from "./pages/InvitationEditPage";
import TemplateSelector from "./components/invitationTemplate/TemplateSelector";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AccessHub />} />
        <Route path="/invitationEdit" element={<InvitationEditPage />} />
        <Route path="/template-selector" element={<TemplateSelector />} />
        <Route
          path="/home"
          element={<ProtecteRoute element={<Home />} redirectTo={"/login"} />}
        />
        <Route path="/evento/:eventId" element={<EventDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
