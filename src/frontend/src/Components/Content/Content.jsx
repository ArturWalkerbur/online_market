import React, { Component, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import style from './style.css';
import ProductCard from '../ProductCard/ProductCard';
import {CustomContext} from "../../utils/Context";


function Content() {

  	const navigate = useNavigate();

  	const {data} = useContext(CustomContext);

  	


	return (
		<div className="content">
		
			{data ? (
				<ul className = "list_div">
				    {data.map(product => (
						<ProductCard product={product}/>
				    ))}
				</ul>
			) : (
				<p>Loading...</p>
			)}
			
		</div>
		
	);
}

export default Content;