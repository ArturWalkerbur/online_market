import React, { Component, useContext, useState } from 'react';
import {CustomContext} from "../utils/Context";


function Login() {

	const { errorLogin, login } = useContext(CustomContext);

	const [localItem, setLocalItem] = useState({});

	const handleChange = (e) => {
	    const { name, value } = e.target;
	    setLocalItem(prev => ({
	      ...prev,
	      [name]: value
	    }));
	};


	return (
		<div className="reactsite">
		
			<link
		        rel="stylesheet"
		        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
		        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
		        crossOrigin="anonymous"
		    />

			<div className="container">
	            <div className="row">
	                <div className="col-md-6 offset-md-3">

	                    {errorLogin && <div className="alert alert-danger">Invalid Email or Password</div>}

	                    <div className="card">
	                        <div className="card-header">
	                            <h2 className="text-center">Login</h2>
	                        </div>
	                        <div className="card-body">
	                            <form
	                            	onSubmit={(e) => login(e, localItem)}
	                                role="form"	                                
	                                className="form-horizontal"
	                            >
	                                <div className="form-group mb-3">
	                                    <label className="control-label"> Email</label>
	                                    <input
	                                        type="text"
	                                        id="email"
	                                        name="email"
	                                        className="form-control"
	                                        placeholder="Введите e-mail"
	                                        onChange={handleChange}
	                                    />
	                                </div>

	                                <div className="form-group mb-3">
	                                    <label className="control-label"> Password</label>
	                                    <input
	                                        type="password"
	                                        id="password"
	                                        name="password"
	                                        className="form-control"
	                                        placeholder="Введите пароль"
	                                        onChange={handleChange}
	                                    />
	                                </div>
	                                <div className="form-group mb-3">
	                                    <button type="submit" className="btn btn-primary" >Войти</button>
	                                </div>
	                            </form>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>

		</div>
		
	);
}

export default Login;