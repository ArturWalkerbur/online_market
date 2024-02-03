import React, { Component, useState, useEffect } from 'react';
import style from './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import { BsCart4 } from "react-icons/bs";
import ProductCard from '../ProductCard/ProductCard';

function Content_catalog() {

	const {item} = useParams();
	const navigate = useNavigate();

	const [data, setData] = useState(null);

  	useEffect(() => {
	    fetch(`http://localhost:8000/api/guest/getProductsByCategory/${item}`)
	      .then(response => response.json()) 
	      .then(result => setData(result))
	      .catch(error => console.error('Error fetching data:', error));
  	}, []);

  	console.log(item);

	  	return(
			<div className='content_catalog'>
				<h2 className="categoryTitle">{item}</h2>
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

export default Content_catalog;