import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/update/:id" element={<Update />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
