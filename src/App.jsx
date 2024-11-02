import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/shared/Layout';
import Dashboard from './Components/Dashboard';
import ManageOrders from './Components/ManageOrders';
import SearchOrder from './Components/SearchOrder';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/manage" element={<ManageOrders />} />
          <Route path="/search" element={<SearchOrder />} />
        </Route>
      </Routes>
      <ToastContainer /> 
    </Router>
  );
};

export default App;
