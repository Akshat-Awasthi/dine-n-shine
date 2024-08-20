import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/shared/Layout';
import Dashboard from './Components/Dashboard';


const App = () => {

  return (
    <Router>
        <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Dashboard/>} />
        </Route>
        </Routes>

    </Router>
  );
};

export default App;
