import { Routes } from "react-router";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Academiccalendar from "./components/Academiccalendar";
import Cafeteria from "./components/Cafeteria";
import FiDust from "./components/FiDust";
import HanGang from "./components/HanGang";
import TestSchedule from "./components/TestSchedule";
import Weather from "./components/Weather";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Cafeteria />} />
          <Route path="/academiccalendar" element={<Academiccalendar />} />
          <Route path="testschedule" element={<TestSchedule />} />
          <Route path="/hangang" element={<HanGang />} />
          <Route path="/finedust" element={<FiDust />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
