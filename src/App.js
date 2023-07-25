import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Product from './components/product/Product';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
    <Route index element={<Home />} />
    <Route path='/product' element={<Product />} />
    
    </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
