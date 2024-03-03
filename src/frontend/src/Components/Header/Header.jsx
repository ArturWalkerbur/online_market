import React, { Component, useContext } from 'react';
import style from './styles.css';
import { Link } from "react-router-dom";
import {CustomContext} from "../../utils/Context";

function Header(props) {

	const {isAuthenticated, logout} = useContext(CustomContext);

	let menu = props.links;
	return (
		<div className="header">

			<div className="logo">
				<h1 className = "title"><Link className="titleLinkTheZoo" to="/"><b className = "Zoo">CHN</b>Tauar</Link></h1>
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
			{isAuthenticated() &&
			<div>
				<button type="button" onClick={() => logout()}>Выйти</button>
			</div>
			}
			

		</div>
		
	);
}

export default Header;