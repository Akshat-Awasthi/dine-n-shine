import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/shared/Layout';
import Dashboard from './Components/Dashboard';
import ManageOrders from './Components/ManageOrders';
import SearchOrder from './Components/SearchOrder';
import Menu from './Components/Menu';
import ServiceDetail from './Components/ServiceDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/manage" element={<ManageOrders />} />
          <Route path="/search" element={<SearchOrder />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/services/:id" element={<ServiceDetail/>} />
        </Route>
      </Routes>
      <ToastContainer /> 
    </Router>
  );
};

export default App;
