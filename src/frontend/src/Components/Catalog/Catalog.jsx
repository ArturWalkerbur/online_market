import React, { Component, useState, useEffect  } from 'react';
import style from './style.css';
import { Link } from "react-router-dom";



function Catalog() {


	const [data, setData] = useState(null);

	  	useEffect(() => {
	    fetch('http://localhost:8000/api/guest/getAllCategory')
	      .then(response => response.json()) 
	      .then(result => setData(result)) 
	      .catch(error => console.error('Error fetching data:', error));

	}, []);

  	console.log(data);


	return (
		<div className="catalog">
			<h2 className="titleCatalog">Каталог товаров</h2>
			{data ? (
				<ul className="row">
			        {data.map(category => (
			          	<div className="column">
							<div className="imgcat">
								<img className = "categoryimg" src={`http://localhost:8000/api/guest/viewImg/${category.img}`} alt='' />
								
							</div>
							
							<h3 className="categoryTitle2"><Link className="linkin" to={`/category/${category.name}`}>{category.name}</Link></h3>
						</div>
					))}
			    </ul>
			) : (
			    <p>Loading...</p>
			)}
		</div>
		
	);
}

export default Catalog;