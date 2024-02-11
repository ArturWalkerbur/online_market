import {createContext, useEffect, useState} from "react";

export const CustomContext = createContext()

export const Context = (props) => {


	const [data, setData] = useState(null);
	const [dataCatalog, setDataCatalog] = useState(null);
	const [cart, setCart] = useState([]);



	useEffect(() => {
	    fetch('http://localhost:8000/api/guest/getAllProducts')
	      .then(response => response.json()) 
	      .then(result => setData(result)) 
	      .catch(error => console.error('Error fetching data:', error));
  	}, []);


	useEffect(() => {
	    fetch('http://localhost:8000/api/guest/getAllCategory')
	      .then(response => response.json()) 
	      .then(result => setDataCatalog(result)) 
	      .catch(error => console.error('Error fetching data:', error));

	}, []);


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

	const handleSubmitOrder = (e, order) => {
	  	e.preventDefault();
	    /*try {
		    const response = await fetch('url_вашего_сервера', {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json'
		      },
		      body: JSON.stringify(order)
		    });

		    if (response.ok) {
		      const data = await response.json();
		      console.log(data);
		    } else {
		      console.error('Ошибка при отправке заказа:', response.statusText);
		    }
		} catch (error) {
		    console.error('Ошибка при готовке отправке:', error.message);
		}*/
	    console.log(order);
	};
  	




	const value = {

		data,
		dataCatalog,
		cart,
		addInCart,
		plusOneInCart,
		minusOneFromCart,
		removeOneFromCart,
		handleSubmitOrder
	}

	return <CustomContext.Provider value={value}>

		{props.children}

	</CustomContext.Provider>


}

