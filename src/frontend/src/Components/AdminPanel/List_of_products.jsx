import React, { Component, useState, useContext, useEffect} from 'react';
import { useNavigate, Link } from "react-router-dom";
import style from './style.css';
import {CustomContext} from "../../utils/Context";
import { BsArrowLeft } from "react-icons/bs";
import EditItemForm from "./Forms/EditItemForm";
import AddItemForm from "./Forms/AddItemForm";


function ListProducts() {

	const { data, deleteProduct } = useContext(CustomContext);

	const [edit, setEdit] = useState(false);

	const [showAdd, setShowAdd] = useState(false);

	const handleToggle = () => {
		setEdit(prevEdit => !prevEdit);
	};

	const showAddToggle = () => {
		setShowAdd(prevEdit => !prevEdit);
	};

	const [product, setProduct] = useState({});


  	return (

  		<div className="container">
			
			<link
		        rel="stylesheet"
		        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
		        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
		        crossOrigin="anonymous"
		    />

		    <br />

		    {showAdd &&
		    	<div>
		    		<AddItemForm showAddToggle={showAddToggle}/>
		    		<br />
				</div>				
		    }

		    <div className="row col-md-12">

		    	{!edit &&
		    	<div className="second-menu">
		    		<div>
		    			<h2>Список товаров</h2>	
		    		</div>
		    		{!showAdd && 
		    		<div>
		    			<button onClick={() => showAddToggle()} className="btn btn-info">Добавить Новый Товар</button>		
		    		</div>
		    		}	
		    	</div>
		        
		    	}
		    	{edit &&
		    	<div>
		    		<button className="btn btn-warning" onClick={handleToggle}><BsArrowLeft />Назад</button>
		    		<h2 className="titleEdit">Изменить товар</h2>
		    		<EditItemForm item={product}/>
		    	</div>
		    	

		    	}
		    </div>
		    <br />


    

		    {data ? (
		    	<div className="overflow-container">
		    	{!edit && 
		    	<table className="table table-bordered table-hover">
			        <thead className="table-info">
			        <tr className="th-center">
			            <th>#</th>
			            <th>Наименование</th>
			            <th>Цена</th>
			            <th>Изображение</th>
			            <th>Описание</th>
			            <th>Категория</th>
			            <th>В наличии</th>
			            <th> </th>
			        </tr>
			        </thead>
       				<tbody>
				        {data.map(item => (
						    <tr key={item.id}>
						        <td>{item.id}</td>
						        <td style={{ width: '100px' }}>{item.name}</td>
						        <td>{item.price}</td>
						        <td><img style={{ width: '100px'}} src={`http://localhost:8000/api/guest/viewImg/${item.img}`} alt="Product" className="img-responsive" /></td>
						        <td style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>{item.description}</td>
						        <td>{item.category.name}</td>
						        <td>{item.availability ? 'ДА' : 'НЕТ'}</td>
						        <td>
						        	<button className="btn btn-warning" onClick={() => { handleToggle(); setProduct(item); }}>Изменить</button>
						        	<br />
						        	<br />
						        	<button className="btn btn-danger" onClick={() => deleteProduct(item.id)}>Удалить</button>
						        </td>
						    </tr>
						))}
			        </tbody>
   				</table>
		    	}

		    	</div>
				
			) : (
				<p>Loading...</p>
			)}

			
		    
		</div>

  	);

}

export default ListProducts;