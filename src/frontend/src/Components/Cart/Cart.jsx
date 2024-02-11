import React, { Component, useState, useContext} from 'react';
import { useNavigate, Link } from "react-router-dom";
import style from './style.css';
import {CustomContext} from "../../utils/Context";
import { BsArrowLeft } from "react-icons/bs";
import OrderForm from "./OrderForm";

function Cart() {


	const {cart, plusOneInCart, minusOneFromCart, removeOneFromCart} = useContext(CustomContext);

	console.log(cart);

	var totalCount = 0;
	var totalPrice = 0;

	cart.map(item => {
		totalCount += item.count;
		totalPrice += item.count * item.price;
	})


	return (
		<div className="content">
		
			{cart && cart.length > 0 ? (
				<div className="card">
		            <div className="row">
		                <div className="col-md-8 cart">
		                    <div className="titleCart">
		                        <div className="row_title">
		                            <div className="col"><h4><b>Корзина</b></h4></div>
		                            <div className="col align-self-center text-right text-muted">Количество товаров: {cart.length}</div>
		                        </div>
		                    </div>
		                    {cart.map(item => (
		                    	<div>
			                    	<hr />
						          	<div className="row">
										
				                        <div className="row main align-items-center">
				                            <div className="col-2"><img src={`http://localhost:8000/api/guest/viewImg/${item.img}`} alt="Product" className="img-fluid"/></div>
				                            <div className="col">
				                                <div className="row text-muted text-name">{item.name}</div>
				                                <div className="row text-description">{item.description}</div>
				                            </div>
				                            <div className="col count">
				                            	<button className="minus" onClick={() => minusOneFromCart(item.id)}>-</button><p className="border">{item.count}</p><button onClick={() => plusOneInCart(item.id)} className="plus">+</button>	
				                            </div>
				                            <div className="col product-price"><b>₸ {item.price * item.count} </b><button className="close" onClick={() => removeOneFromCart(item.id)}>&#10005;</button></div>
				                        </div>
				                    </div>	
		                    	</div>
					          	
							))}
		                    
		                    
		                    <div className="back-to-shop"><Link to="/"><BsArrowLeft /><span className="text-muted text-bootom"> Назад к товарам</span></Link></div>
		                </div>
		                <div className="col-md-4 summary">
		                    <div><h3 className="summary-title"><b>Итог</b></h3></div>
		                    <hr />
		                    <div className="row final-assessment">
		                        <div className="col" style={{ paddingLeft: 0 }}><div>ТОВАРЫ: {cart.length}</div>Количество: {totalCount}</div>
		                        <div className="col text-right">₸ {totalPrice}</div>
		                    </div>
		                    <OrderForm />
		                    


		                </div>
		            </div>
		            
		        </div>
			) : (
				<p className = "empty_cart">Корзина пуста Т_Т</p>
			)}
			
		</div>
		
	);
}

export default Cart;