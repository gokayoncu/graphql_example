import React from 'react';
import Modal from './components/modal';
import Home from './pages/home/index';
import Events from './pages/events/index';
import Event from './pages/event';
import useStore from './store';
import "antd/dist/reset.css";
import "./index.css";
import {Routes,Route,} from "react-router";
import AlertModal from './components/alert/index'

const App = () => {
  const { modal: { isModalOpen },alert } = useStore(); 
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/event/:id" element={<Event/>} />
    </Routes>
    {isModalOpen && <Modal />}
    {alert.isModalOpen && <AlertModal message={alert.data.message} type={alert.data.type} />}
    </>
  );
};

export default App;