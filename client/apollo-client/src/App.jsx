import React from 'react';

import "antd/dist/reset.css";
import "./index.css";
import {
  Routes,
  Route,
} from "react-router";

import Home from './pages/home/index';
import Events from './pages/events/index';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
    </Routes>
  );
};

export default App;