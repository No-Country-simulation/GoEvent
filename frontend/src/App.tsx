import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessHub, Home, Events } from "./pages";
import LandingPage from "./pages/LandingPage";
import ProtecteRoute from "./components/ProtecteRoute";
import QrScanner from "./components/QrScanner";
import EventDetailsPage from "./pages/EventDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AccessHub />} />
        <Route
          path="/home"
          element={<ProtecteRoute element={<Home />} redirectTo={"/login"} />}
        />
        <Route path="/scanner" element={<QrScanner />} />
        <Route path="/eventos" element={<Events />} />
        <Route path="/evento/:eventId" element={<EventDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
