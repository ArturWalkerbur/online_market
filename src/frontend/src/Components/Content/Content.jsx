import React, { Component, useState, useEffect  } from 'react';
import { useNavigate } from "react-router-dom";
import style from './style.css';
import ProductCard from '../ProductCard/ProductCard';


function Content() {

  	const navigate = useNavigate();

  	const [data, setData] = useState(null);

  	useEffect(() => {
    fetch('http://localhost:8000/api/guest/getAllProducts')
      .then(response => response.json()) 
      .then(result => setData(result)) 
      .catch(error => console.error('Error fetching data:', error));
  	}, []);

  	console.log(data);


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