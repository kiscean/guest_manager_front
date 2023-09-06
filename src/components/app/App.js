import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import axios from "axios";

import Header from "../header/Header";
import Home from "../../pages/Home";
import Introduction from "../../pages/Introduction";
import Invitation from "../../pages/Invitation";
import RegEnter from "../../pages/RegEnter";
import Footer from "../footer/Footer";

import './style.css';

function App() {
  return (
    <div>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/introduction" element={<Introduction />} />
                <Route path="/invitation" element={<Invitation />} />
                <Route path="/regenter" element={<RegEnter />} />
            </Routes>
            <Footer />
        </Router>
    </div>
  );
}

export default App;
