import React, { Component, useState, useContext, useEffect} from 'react';
import { useNavigate, Link } from "react-router-dom";
import style from './style.css';
import {CustomContext} from "../../utils/Context";
import { BsArrowLeft } from "react-icons/bs";
import AddCategoryForm from "./Forms/AddCategoryForm";
import EditCategoryForm from "./Forms/EditCategoryForm";


function ListCategory() {

	const { dataCatalog, deleteCategory } = useContext(CustomContext);

	const [edit, setEdit] = useState(false);

	const [showAdd, setShowAdd] = useState(false);

	const handleToggle = () => {
		setEdit(prevEdit => !prevEdit);
	};

	const showAddToggle = () => {
		setShowAdd(prevEdit => !prevEdit);
	};

	const [category, setCategory] = useState({});

	return(

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
		    		<AddCategoryForm showAddToggle={showAddToggle} />
		    		<br />
				</div>				
		    }

		    <div className="row col-md-12">

		    	{!edit &&
		    	<div className="second-menu">
		    		<div>
		    			<h2>Список категорий</h2>	
		    		</div>
		    		{!showAdd && 
		    		<div>
		    			<button onClick={() => showAddToggle()} className="btn btn-info">Добавить Новую Категорию</button>		
		    		</div>
		    		}	
		    	</div>
		        
		    	}
		    	{edit &&
		    	<div>
		    		<button className="btn btn-warning" onClick={handleToggle}><BsArrowLeft />Назад</button>
		    		<h2 className="titleEdit">Изменить категорию</h2>
		    		<EditCategoryForm item={category} />
		    	</div>
		    	

		    	}
		    </div>
		    <br />


    

		    {dataCatalog ? (
		    	<div className="overflow-container container" style={{ width: '900px',  }}>
		    	{!edit && 
		    	<table className="table table-bordered table-hover">
			        <thead className="table-info">
			        <tr className="th-center">
			            <th>#</th>
			            <th>Наименование</th>
			            <th>Изображение</th>
			            <th> </th>
			        </tr>
			        </thead>
       				<tbody>
				        {dataCatalog.map(item => (
						    <tr key={item.id}>
						        <td>{item.id}</td>
						        <td style={{ width: '150px' }}>{item.name}</td>
						        <td><img style={{ width: '150px'}} src={`http://localhost:8000/api/guest/viewImg/${item.img}`} alt="Product" className="img-responsive" /></td>
						        <td>
						        	<button className="btn btn-warning" onClick={() => { handleToggle(); setCategory(item); }}>Изменить</button>
						        	<br />
						        	<br />
						        	<button className="btn btn-danger" onClick={() => deleteCategory(item.id)}>Удалить</button>
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


	)

}

export default ListCategory;