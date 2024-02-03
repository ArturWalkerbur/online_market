import React, { Component } from 'react';
import Header from '../Components/Header/Header';
import Catalog from '../Components/Catalog/Catalog';
import Footer from '../Components/Footer/Footer';


function Catalogpage(props) {

	return (
		<div className="reactsite">

		<Header links={props.links}/>
		<Catalog />
		<Footer />
		</div>

		
	);
}

export default Catalogpage;