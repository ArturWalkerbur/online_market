import React, { Component } from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import ListMessages from '../Components/AdminPanel/List_of_messages';


function AdminPanel() {

	let links = [

	    {
	      title: 'Заказы',
	      link: '/admin_bolme/',
	    },
	    {
	      title: 'Катигории и Продукты',
	      link: '/admin_bolme/main',
	    },
	    {
	      title: 'Контакты и интерфейс',
	      link: '/admin_bolme/secondary',
	    },
	];

	return (
		<div className="reactsite">
		
		<Header links={links}/>

		<ListMessages />
		
		<Footer />

		</div>
		
	);
}

export default AdminPanel;