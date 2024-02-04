import React, { Component } from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Cart from '../Components/Cart/Cart';


function Home(props) {

	return (
		<div className="reactsite">
		
		<Header links={props.links}/>
		<Cart />
		<Footer />

		</div>
		
	);
}

export default Home;