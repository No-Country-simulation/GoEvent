import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessHub, Home, Landing } from "./pages";
import ProtecteRoute from "./components/ProtecteRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AccessHub />} />
        <Route
          path="/home"
          element={<ProtecteRoute element={<Home />} redirectTo={"/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
