import React, { Component } from 'react';
import style from './style.css';

function Footer() {

	return (
		<div className = "footer">
			<div className="breaking">
				
			</div>
			
			<div className = "footer_top">
			
				<div className="footer_info">
					<div className='footer_contaner'>
						<h3 className='info_titile'>Основные ссылки</h3>
						<p className='footer_text'><a className='footer_link' href="/">Главная</a></p>
						<p className='footer_text'><a className='footer_link' href="/catalog">Каталог</a></p>
						<p className='footer_text'><a className='footer_link' href="/about">О нас</a></p>

					</div>

					<div className='footer_contaner'>
						<h3 className='info_titile'>Время работы</h3>
						<p className='footer_text'>Пн-пт - 09:00 - 17:00 </p>
						<p className='footer_text'>Сб - выходной </p>
						<p className='footer_text'>Вс - выходной</p>

					</div>

					<div className='footer_contaner'>
						<h3 className='info_titile'>Наши контакты</h3>
						<p className='footer_text'><a className='footer_link' href="tel:+77771112233">87771112233</a></p>
						<p className='footer_text'><a className='footer_link' href="mailto:zakaz@thezoolove.kz">zakaz@thezoolove.kz</a></p>
						<p className='footer_text'>находится по адресу:</p>
						<p className='footer_text'>г. Алматы, ул. Сейфулина 392</p>

					</div>
				</div>

			</div>
		</div>
		
	);
}

export default Footer;