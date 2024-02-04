import React, { Component, useState, useEffect, useContext } from 'react';
import style from './style.css';
import { Link } from "react-router-dom";
import {CustomContext} from "../../utils/Context";


function Catalog() {


	const {dataCatalog} = useContext(CustomContext);

	return (
		<div className="catalog">
			<h2 className="titleCatalog">Каталог товаров</h2>
				{dataCatalog ? (
					<ul className="row_catalog">
				        {dataCatalog.map(category => (
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