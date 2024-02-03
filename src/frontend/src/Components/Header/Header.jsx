import React, { Component } from 'react';
import style from './styles.css';
import { Link } from "react-router-dom";

function Header(props) {
	let menu = props.links;
	return (
		<div className="header">

			<div className="logo">
				<h1 className = "title"><Link className="titleLinkTheZoo" to="/">The <b className = "Zoo">Zoo</b>love</Link></h1>
			</div>
			<div className = "nav">
				<ul className="menu">
					{menu.map((item, idx) =>(
						<li className="menu-list" key={`menu item ${idx}`}>
							<Link className="menu-items" to={item.link}>{item.title}</Link>
						</li>
						))}
					
				</ul>
			</div>

		</div>
		
	);
}

export default Header;