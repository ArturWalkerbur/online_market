import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/home';
import Catalogpage from './Pages/catalogpage';
import Product_list from './Pages/product_list';


function App() {
  let links = [

    {
      title: 'Главная',
      link: '/',
    },
    {
      title: 'Каталог',
      link: '/category',
    },
    {
      title: 'О нас',
      link: '/about',
    },
  ];
  return (
  <div className="App">
  <Routes>
  <Route path='/' element={<Home links={links}/>} />
  <Route path='/category' element={<Catalogpage links={links}/>} />
  <Route path='/category/:item' element={<Product_list links={links}/>} />
  

  </Routes>
  </div>
  );
}

export default App;

