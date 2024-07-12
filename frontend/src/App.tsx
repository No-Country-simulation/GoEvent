import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessHub, Home } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AccessHub />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
