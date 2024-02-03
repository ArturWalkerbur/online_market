import React, { Component } from 'react';
import Header from '../Components/Header/Header';
import Content_catalog from '../Components/Content_catalog/Content_catalog';
import Footer from '../Components/Footer/Footer';


function Product_list(props) {

	return (
		<div className="reactsite">

		<Header links={props.links}/>
		<Content_catalog />
		<Footer />
		</div>

		
	);
}

export default Product_list