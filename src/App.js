import Cafeteria from "./components/Cafeteria";
import Weather from "./components/Weather";
import FiDust from "./components/FiDust";
import HanGang from "./components/HanGang";
import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
import Academiccalendar from "./components/Academiccalendar";
import TestSchedule from "./components/TestSchedule";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cafeteria />} />
        <Route path="/academiccalendar" element={<Academiccalendar />} />
        <Route path="testschedule" element={<TestSchedule/>} />
        <Route path="/hangang" element={<HanGang />} />
        <Route path="/finedust" element={<FiDust />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;
