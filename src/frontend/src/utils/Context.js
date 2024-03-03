import {createContext, useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

export const CustomContext = createContext()

export const Context = (props) => {


	const [data, setData] = useState(null);
	const [dataCatalog, setDataCatalog] = useState(null);
	const [cart, setCart] = useState([]);
	const [deletedMessage, setDeletedMessage] = useState(false);
	const [operation, setOperation] = useState(false);
	const [errorLogin, setErrorLogin] = useState(false);

	const navigate = useNavigate();

	const tokenKey = 'auth_token';

	useEffect(() => {
	    fetch('http://localhost:8000/api/guest/getAllProducts')
	      .then(response => response.json()) 
	      .then(result => setData(result)) 
	      .catch(error => console.error('Error fetching data:', error));
  	}, [operation]);


	useEffect(() => {
	    fetch('http://localhost:8000/api/guest/getAllCategory')
	      .then(response => response.json()) 
	      .then(result => setDataCatalog(result)) 
	      .catch(error => console.error('Error fetching data:', error));

	}, [operation]);


  	//console.log(data);
  	//console.log(dataCatalog);


	const addInCart = (product) => {

		if(cart.includes(product)){
			// Ничего не делаем, так как продукт уже в корзине
		} else {
			setCart(prev => [...prev, {...product, count: 1}]);	
			console.log(cart);
		}

	}

	const plusOneInCart = (id) => {

		setCart(prev => prev.map(item => {
			if(item.id == id){
				return {...item, count: item.count + 1}
			}
			return item
		}));

	}

	const minusOneFromCart = (id) => {

		setCart(prev => prev.map(item => {
			if(item.id == id && item.count > 1){
				return {...item, count: item.count - 1}
			}
			return item
		}));

	}

	const removeOneFromCart = (id) => {

		const updatedCart = cart.filter((item) => item.id !== id);

		setCart(updatedCart);

	}

	const handleSubmitOrder = async (e, order) => {
		e.preventDefault();

		const today = new Date();

		const orderMessage = {
			id: 0,
			topic: 'Заказ',
			text: `От кого: ${order.name}\nНомер: ${order.number}\n\nТовары: ${cart.map(item => `${item.name} (id: ${item.id}, кол: ${item.count})`).join('\n')}\nДоставка: ${order.shipping === 0 ? 'НЕТ' : (order.shipping+'тг (ДА)')}\nАдрес: ${order.address}\n\nИтоговая сумма: ${cart.reduce((total, item) => total + (item.price * item.count), 0) + order.shipping}тг\n`,
			date: today.toISOString().split('T')[0]
		};

	    try {
		    const response = await fetch('http://localhost:8000/api/guest/addNewMessage', {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json'
		      },
		      body: JSON.stringify(orderMessage)
		    });

		    if (response.ok) {
		      const data = await response.json();
		    } else {
		      console.error('Ошибка при отправке заказа:', response.statusText);
		    }
		} catch (error) {
		    console.error('Ошибка при готовке отправке:', error.message);
		}
	    console.log(order);
	};

	const isAuthenticated = (): boolean => {
	    const token = localStorage.getItem(tokenKey);
	    return !!token;
	};

	const setAuthToken = (token: string): void => {
	    localStorage.setItem(tokenKey, token);
	};

	const getAuthToken = (): string | null => {
	    return localStorage.getItem(tokenKey);
	};

	const getUserRole = (): string | null => {
	    const token = localStorage.getItem(tokenKey);
	    if (token) {
	        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
	        return tokenPayload.role || null;
	    }
	    return null;
	};

	const getUserName = (): string | null => {
	    const token = localStorage.getItem(tokenKey);
	    if (token) {
	        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
	        return tokenPayload.username || null;
	    }
	    return null;
	};

	const getUserEmail = (): string | null => {
	    const token = localStorage.getItem(tokenKey);
	    if (token) {
	        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
	        return tokenPayload.email || null;
	    }
	    return null;
	};

	const login = async (e, item) => {
		e.preventDefault();

		let requestBody = {			
		    "email": item.email,
		    "password": item.password,
		}
		try {
		    const response = await fetch('http://localhost:8000/api/guest/login', {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json'
		      },
		      body: JSON.stringify(requestBody)
		    });


		    if (response.ok) {
		      const data = await response.json();
		      setAuthToken(data.accessToken);

	  		  navigate('/admin_bolme');
		    } else {
		      setErrorLogin(true);
		      console.error('Ошибка при авторизации:', response.statusText);
		    }
		} catch (error) {
		    console.error('Ошибка при готовке отправке:', error.message);
		}
	};

	const logout = (): void => {
	    localStorage.removeItem(tokenKey);
	    navigate('/');
	};

	const headers = {
	    'Content-Type': 'application/json',
	    'Authorization': `Bearer ${getAuthToken()}`
	};
  	

	const deleteMsg = async (id) => {
		console.log(`Deleting order with ID: ${id}`);
		try {
		    const response = await fetch('http://localhost:8000/api/admin/deleteMessage/'+id, {
		      method: 'DELETE',
		      headers: headers
		    });

		    if (response.ok) {
		      const data = await response.text();
		      setDeletedMessage(prevState => !prevState);
		    } else {
		      console.error('Ошибка при отправке заказа:', response.statusText);
		    }
		} catch (error) {
		    console.error('Ошибка при готовке отправке:', error.message);
		}
	};

	const deleteProduct = async (id) => {
		console.log(`Deleting product with ID: ${id}`);
		try {
		    const response = await fetch('http://localhost:8000/api/admin/deleteProduct/'+id, {
		      method: 'DELETE',
		      headers: headers
		    });

		    if (response.ok) {
		      const data = await response.text();
		      setOperation(prevState => !prevState);
		    } else {
		      console.error('Ошибка при удалении:', response.statusText);
		    }
		} catch (error) {
		    console.error('Ошибка при готовке отправке:', error.message);
		}
	};

	const deleteCategory = async (id) => {
		console.log(`Deleting category with ID: ${id}`);
		try {
		    const response = await fetch('http://localhost:8000/api/admin/deleteCategory/'+id, {
		      method: 'DELETE',
		      headers: headers
		    });

		    if (response.ok) {
		      const data = await response.text();
		      setOperation(prevState => !prevState);
		    } else {
		      console.error('Ошибка при удалении:', response.statusText);
		    }
		} catch (error) {
		    console.error('Ошибка при готовке отправке:', error.message);
		}
	};

	const editProduct = async (e, product) => {
		e.preventDefault();

		let requestBody = {}

		if(!product.category_id){
			requestBody = {
				"id": product.id,
			    "name": product.name,
			    "description": product.description,
			    "price": product.price,
			    "img": product.img,
			    "availability": product.availability,
			    "category_id": parseInt(product.category.id)
			}
		} else {
			requestBody = {
				"id": product.id,
			    "name": product.name,
			    "description": product.description,
			    "price": product.price,
			    "img": product.img,
			    "availability": product.availability,
			    "category_id": parseInt(product.category_id)
			}
		}
		try {
		    const response = await fetch('http://localhost:8000/api/admin/editProduct', {
		      method: 'POST',
		      headers: headers,
		      body: JSON.stringify(requestBody)
		    });


		    if (response.ok) {
		      const data = await response.text();
		      setOperation(prevState => !prevState);
		    } else {
		      console.error('Ошибка при отправке изменений товара:', response.statusText);
		    }
		} catch (error) {
		    console.error('Ошибка при готовке отправке:', error.message);
		}
	};

	const editCategory = async (e, category) => {
		e.preventDefault();
		
		let	requestBody = {
			"id": category.id,
			"name": category.name,
			"img": category.img
		}
		
		try {
		    const response = await fetch('http://localhost:8000/api/admin/editCategory', {
		      method: 'POST',
		      headers: headers,
		      body: JSON.stringify(requestBody)
		    });


		    if (response.ok) {
		      const data = await response.text();
		      setOperation(prevState => !prevState);
		    } else {
		      console.error('Ошибка при отправке изменений категории:', response.statusText);
		    }
		} catch (error) {
		    console.error('Ошибка при готовке отправке:', error.message);
		}
	};

	const addProduct = async (e, product) => {
		e.preventDefault();

		let requestBody = {
			"id": product.id,
		    "name": product.name,
		    "description": product.description,
		    "price": product.price,
		    "img": product.img,
		    "availability": product.availability,
		    "category_id": parseInt(product.category_id)
		}
		console.log(requestBody);
		try {
		    const response = await fetch('http://localhost:8000/api/admin/addNewProduct', {
		      method: 'POST',
		      headers: headers,
		      body: JSON.stringify(requestBody)
		    });


		    if (response.ok) {
		      const data = await response.text();
		      setOperation(prevState => !prevState);
		      console.log(data);
		    } else {
		      console.error('Ошибка при отправке добавлении товара:', response.statusText);
		    }
		} catch (error) {
		    console.error('Ошибка при готовке отправке:', error.message);
		}
	};

	const addCategory = async (e, category) => {
		e.preventDefault();

		let requestBody = {
			"id": category.id,
		    "name": category.name,
		    "img": category.img,
		}
		console.log(requestBody);
		try {
		    const response = await fetch('http://localhost:8000/api/admin/addNewCategory', {
		      method: 'POST',
		      headers: headers,
		      body: JSON.stringify(requestBody)
		    });


		    if (response.ok) {
		      const data = await response.text();
		      setOperation(prevState => !prevState);
		    } else {
		      console.error('Ошибка при отправке добавлении категории:', response.statusText);
		    }
		} catch (error) {
		    console.error('Ошибка при готовке отправке:', error.message);
		}
	};


	const value = {

		data,
		dataCatalog,
		cart,
		addInCart,
		plusOneInCart,
		minusOneFromCart,
		removeOneFromCart,
		handleSubmitOrder,
		deleteMsg,
		deletedMessage,
		deleteProduct,
		deleteCategory,
		editProduct,
		editCategory,
		addProduct,
		addCategory,
		errorLogin,
		login,
		isAuthenticated,
		getUserRole,
		logout,
		getUserEmail
	}

	return <CustomContext.Provider value={value}>

		{props.children}

	</CustomContext.Provider>


}

