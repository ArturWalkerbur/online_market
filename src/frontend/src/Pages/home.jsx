import React, { Component } from 'react';
import Header from '../Components/Header/Header';
import Content from '../Components/Content/Content';
import Footer from '../Components/Footer/Footer';


function Home(props) {

	return (
		<div className="reactsite">
		
		<Header links={props.links}/>
		<Content />
		<Footer />

		</div>
		
	);
}

export default Home;