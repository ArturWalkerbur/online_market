import React, { Component, useState, useContext} from 'react';
import { useNavigate, Link } from "react-router-dom";
import style from './style.css';
import {CustomContext} from "../../utils/Context";
import { BsArrowLeft } from "react-icons/bs";

function Cart() {


	const {cart} = useContext(CustomContext);

	console.log(cart);


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
				                            <div className="col">
				                                <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
				                            </div>
				                            <div className="col">₸ {item.price} <span className="close">&#10005;</span></div>
				                        </div>
				                    </div>	
		                    	</div>
					          	
							))}
		                    
		                    
		                    <div className="back-to-shop"><Link to="/"><BsArrowLeft /><span className="text-muted text-bootom"> Назад к товарам</span></Link></div>
		                </div>
		                <div className="col-md-4 summary">
		                    <div><h5><b>Итог</b></h5></div>
		                    <hr />
		                    <div className="row">
		                        <div className="col" style={{ paddingLeft: 0 }}>ТОВАРЫ: {cart.length}</div>
		                        <div className="col text-right">&euro; 132.00</div>
		                    </div>
		                    <form>
		                        <p>SHIPPING</p>
		                        <select><option className="text-muted">Standard-Delivery- &euro;5.00</option></select>
		                        <p>GIVE CODE</p>
		                        <input id="code" placeholder="Enter your code" />
		                    </form>
		                    <div className="row" style={{ borderTop: '1px solid rgba(0, 0, 0, .1)', padding: '2vh 0' }}>
		                        <div className="col">TOTAL PRICE</div>
		                        <div className="col text-right">&euro; 137.00</div>
		                    </div>
		                    <button className="btnCart">CHECKOUT</button>
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