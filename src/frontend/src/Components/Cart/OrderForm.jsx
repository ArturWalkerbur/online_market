import React, { Component, useState, useContext} from 'react';
import { useNavigate, Link } from "react-router-dom";
import style from './style.css';
import {CustomContext} from "../../utils/Context";



const OrderForm = () => {

  const {cart, handleSubmitOrder} = useContext(CustomContext);

  var totalPrice = 0.00;

  cart.map(item => {
    totalPrice += item.count * item.price;
  })

  const [shipping, setShipping] = useState(0);

  const [order, setOrder] = useState({
      name: '',
      number: '',
      address: '',
      date: '',
      shipping: 0.00
  });

  const handleSelectShipping = (e) => {
    const selectedShipping = parseFloat(e.target.value);
    setShipping(selectedShipping);
    setOrder(prev => ({
      ...prev,
      shipping: selectedShipping
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };


  return (

    <form onSubmit={(e) => handleSubmitOrder(e, order)}>
      <p>ДОСТАВКА</p>
      <select value={shipping} name="shipping" onChange={handleSelectShipping}>
        <option className="text-muted" value="5000">Стандарт- ₸ 5000.00</option>
        <option className="text-muted" value="0">Самовывоз- Бесплатно</option>
      </select>
      <hr />
      <label>
        ФИО:
        <br />
        <input type="text" name="name" value={order.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        НОМЕР:<span style={{ color: 'red' }}>*</span>
        <br />
        <input type="text" name="number" value={order.number} onChange={handleChange} required/>
      </label>
      <br />
      <label>
        АДРЕСС(не обязательно):
        <br />
        <input type="text" name="address" value={order.address} onChange={handleChange} />
      </label>
      <br />
      <div className="row" style={{ borderTop: '1px solid rgba(0, 0, 0, .1)', padding: '2vh 0' }}>
        <div className="col" style={{paddingLeft: '0' }}>ИТОГОВАЯ ЦЕНА</div>
        <div className="col text-right">₸ {parseFloat(totalPrice + shipping)}</div>
      </div>
      <br />
      <button className="btnCart">ЗАКАЗАТЬ</button>
    </form>
  );
};

export default OrderForm;