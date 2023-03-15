import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Vans from "./pages/Vans";

import "./server.js";
import VanDetail from "./pages/VanDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/vans" element={<Vans />} />
          <Route path="/van/:id" element={<VanDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
