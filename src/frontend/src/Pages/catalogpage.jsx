import React, { Component } from 'react';
import Header from '../Components/Header/Header';
import Catalog from '../Components/Catalog/Catalog';
import Footer from '../Components/Footer/Footer';


function Cartpage(props) {

	return (
		<div className="reactsite">

		<Header links={props.links}/>
		<Catalog />
		<Footer />
		</div>

		
	);
}

export default Cartpage;