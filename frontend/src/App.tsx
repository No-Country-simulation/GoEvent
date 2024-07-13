import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccessHub, Home } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={} /> aqui va la landing  */}
        <Route path="/login" element={<AccessHub />} />
        <Route path="/home" element={<h1>Home</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
