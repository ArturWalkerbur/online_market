import React, { Component, useState, useContext, useEffect} from 'react';
import { useNavigate, Link } from "react-router-dom";
import style from './style.css';
import {CustomContext} from "../../utils/Context";

function ListMessages() {

	const { deleteMsg, deletedMessage } = useContext(CustomContext);

	const [msgs, setMsgs] = useState([]); 


	useEffect(() => {
	    fetch('http://localhost:8000/api/admin/getALLMessages')
	      .then(response => response.json()) 
	      .then(result => setMsgs(result)) 
	      .catch(error => console.error('Error fetching data:', error));
  	}, [deletedMessage]);

  	console.log(msgs);

  	if(msgs.length <= 0){

  		return(

  			<div className="container2">
	  			<div className="row col-md-10">
			        <h2>Список заказов</h2>
			    </div>
  				<p className="no-orders">Пока нету заказов</p>
  			</div>

  		);

  	} else {

  	return (

  		<div className="container">
			
			<link
		        rel="stylesheet"
		        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
		        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
		        crossOrigin="anonymous"
		    />

		    <br />

		    <div className="row col-md-10">
		        <h2>Список заказов</h2>
		    </div>
		    <br />
    

		    {msgs ? (
				<table className="table table-bordered table-hover">
			        <thead className="table-info">
			        <tr className="th-center">
			            <th>#</th>
			            <th>Тема</th>
			            <th>Дата заказа</th>
			            <th>Текст</th>
			            <th> </th>
			        </tr>
			        </thead>
       				<tbody>
				        {msgs.map(msg => (
						    <tr key={msg.id}>
						        <td>{msg.id}</td>
						        <td style={{ width: '100px' }}>{msg.topic}</td>
						        <td>{msg.date}</td>
						        <td style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{msg.text}</td>
						        <td><button className="btn btn-danger" onClick={() => deleteMsg(msg.id)}>Удалить</button></td>
						    </tr>
						))}
			        </tbody>
   				</table>
			) : (
				<p>Loading...</p>
			)}
		    
		</div>

  	);

	}

}

export default ListMessages;