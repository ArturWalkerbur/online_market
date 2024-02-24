import React, {useContext} from 'react'
import { Routes, Route, Link } from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import Home from './Pages/home';
import Catalogpage from './Pages/catalogpage';
import Product_list from './Pages/product_list';
import Cartpage from './Pages/cartpage';
import AdminPanel from './Pages/admin_panel';
import AdminEditor from './Pages/admin_editor';
import Login from './Pages/login';

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
      title: 'Корзина',
      link: '/cart',
    },
  ];
  return (
  <div className="App">
  <Routes>
  <Route path='/' element={<Home links={links}/>} />
  <Route path='/category' element={<Catalogpage links={links}/>} />
  <Route path='/category/:item' element={<Product_list links={links}/>} />
  <Route path='/cart' element={<Cartpage links={links}/>} />
  <Route path='/login' element={<Login />} />
  <Route path='/admin_bolme' element={<PrivateRoute/>}>
    <Route path='' element={<AdminPanel/>}/>
    <Route path='main' element={<AdminEditor/>}/>
  </Route>
  

  </Routes>
  </div>
  );
}

export default App;

