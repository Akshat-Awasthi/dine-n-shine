import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/shared/Layout';
import Dashboard from './Components/Dashboard';
import Orders from './Components/Orders';


const App = () => {

  return (
    <Router>
        <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Dashboard/>} />
          <Route path='/orders' element={<Orders/>}/>
        </Route>
        </Routes>

    </Router>
  );
};

export default App;
