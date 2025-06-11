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

  React.useLayoutEffect(() => {
    if (!document.getElementById("tailortalk-widget-script")) {
      const script = document.createElement("script");
      script.id = "tailortalk-widget-script";
      script.src = "https://plugins.tailortalk.ai/widget.js";
      script.async = true;
      document.body.appendChild(script);
  
      script.onload = () => {
        window.TailorTalk && window.TailorTalk.init({
          agentId: "test_QC_hello",
          widgetName: "My Agent",
          position: {
            "bottom": "20px",
            "right": "20px"
  },
          theme: "light",
        });
      };
    }
  
    return () => {
      const container = document.querySelector(".tt-widget-container");
      if (container) container.remove();
    };
  }, []);

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
