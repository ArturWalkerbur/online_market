import React, { Component } from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import ListProducts from '../Components/AdminPanel/List_of_products';
import ListCategory from '../Components/AdminPanel/List_of_category';

function AdminEditor() {

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

		<ListProducts />
		<br />
		<ListCategory />
	
		<Footer />

		</div>
		
	);
}

export default AdminEditor;